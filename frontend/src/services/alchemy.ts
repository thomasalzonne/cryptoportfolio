import { formatUnits } from 'viem'
import { createPublicClient, http } from 'viem'
import { mainnet, arbitrum, base } from 'viem/chains'

const ALCHEMY_API_KEY = 'pactN5YjBI-agpePlY4p1'

export interface Token {
  contractAddress: string
  balance: string
  name: string
  symbol: string
  decimals: number
  logo?: string
  formattedBalance: string
  network: string
  isSpam?: boolean
  isNative?: boolean  // Nouveau : pour identifier ETH natif
}

// Clients pour récupérer les balances natifs
const clients = {
  'eth-mainnet': createPublicClient({
    chain: mainnet,
    transport: http(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`)
  }),
  'arb-mainnet': createPublicClient({
    chain: arbitrum,
    transport: http(`https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`)
  }),
  'base-mainnet': createPublicClient({
    chain: base,
    transport: http(`https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`)
  })
}

// Logos ETH pour chaque réseau
const ETH_LOGOS = {
  'eth-mainnet': 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
  'arb-mainnet': 'https://cryptologos.cc/logos/arbitrum-arb-logo.png',
  'base-mainnet': 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
}

// Récupérer le balance ETH natif
async function getNativeBalance(address: string, network: keyof typeof clients): Promise<Token | null> {
  try {
    const client = clients[network]
    const balance = await client.getBalance({ address: address as `0x${string}` })
    
    const formattedBalance = formatUnits(balance, 18)

    return {
      contractAddress: '0x0000000000000000000000000000000000000000', // Adresse spéciale pour ETH natif
      balance: balance.toString(),
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      logo: ETH_LOGOS[network],
      formattedBalance: parseFloat(formattedBalance).toFixed(6),
      network: network,
      isSpam: false,
      isNative: true
    }
  } catch (error) {
    console.error(`Error fetching native balance for ${network}:`, error)
    return null
  }
}

// Liste de tokens vérifiés (whitelist) - tu peux l'étendre
const VERIFIED_TOKENS: Record<string, string[]> = {
  'eth-mainnet': [
    '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
    '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI
    '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', // WBTC
    '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9', // AAVE
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // UNI
    '0x514910771af9ca656af840dff83e8264ecf986ca', // LINK
  ],
  'arb-mainnet': [
    '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9', // USDT
    '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8', // USDC
    '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1', // DAI
    '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f', // WBTC
    '0x912ce59144191c1204e64559fe8253a0e49e6548', // ARB
  ],
  'base-mainnet': [
    '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913', // USDC
    '0x50c5725949a6f0c72e6c4a641f24049a917db0cb', // DAI
    '0x4200000000000000000000000000000000000006', // WETH
  ]
}

// Filtrer les tokens scam
function isLikelySpam(token: any, network: string): boolean {
  // Token natif jamais spam
  if (token.isNative) return false

  // Token dans la whitelist = pas spam
  const verified = VERIFIED_TOKENS[network] || []
  if (verified.includes(token.contractAddress.toLowerCase())) {
    return false
  }

  // Vérifications anti-spam
  const checks = {
    noMetadata: !token.name || !token.symbol,
    tooLong: token.name?.length > 50 || token.symbol?.length > 20,
    tinyBalance: parseFloat(token.formattedBalance) < 0.000001,
    suspiciousSymbol: /[^\w\s-]/.test(token.symbol || ''),
    noLogo: !token.logo,
  }

  const spamScore = Object.values(checks).filter(Boolean).length
  return spamScore >= 2
}

// Récupérer les tokens d'un réseau
async function getTokensForNetwork(
  address: string, 
  network: string
): Promise<Token[]> {
  try {
    // 1. Récupérer l'ETH natif d'abord
    const nativeBalance = await getNativeBalance(address, network as keyof typeof clients)
    const tokens: Token[] = nativeBalance ? [nativeBalance] : []

    // 2. Récupérer les tokens ERC-20
    const balancesResponse = await fetch(
      `https://${network}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'alchemy_getTokenBalances',
          params: [address],
          id: 1,
        }),
      }
    )

    const balancesData = await balancesResponse.json()
    
    const tokenBalances = balancesData.result.tokenBalances.filter(
      (token: any) => token.tokenBalance !== '0x0000000000000000000000000000000000000000000000000000000000000000'
    )

    // 3. Récupérer les métadonnées pour chaque token ERC-20
    const tokensPromises = tokenBalances.map(async (balance: any) => {
      try {
        const metadataResponse = await fetch(
          `https://${network}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              method: 'alchemy_getTokenMetadata',
              params: [balance.contractAddress],
              id: 1,
            }),
          }
        )

        const metadataData = await metadataResponse.json()
        const metadata = metadataData.result

        const formattedBalance = formatUnits(
          BigInt(balance.tokenBalance),
          metadata.decimals || 18
        )

        const token = {
          contractAddress: balance.contractAddress,
          balance: balance.tokenBalance,
          name: metadata.name || 'Unknown',
          symbol: metadata.symbol || '???',
          decimals: metadata.decimals || 18,
          logo: metadata.logo,
          formattedBalance: parseFloat(formattedBalance).toFixed(6),
          network: network,
          isNative: false
        }

        return {
          ...token,
          isSpam: isLikelySpam(token, network)
        }
      } catch (error) {
        console.error(`Error fetching metadata for ${balance.contractAddress}:`, error)
        return null
      }
    })

    const erc20Tokens = await Promise.all(tokensPromises)
    const validTokens = erc20Tokens.filter((t): t is Token => t !== null)

    return [...tokens, ...validTokens]
  } catch (error) {
    console.error(`Error fetching tokens for ${network}:`, error)
    return []
  }
}

// Récupérer les tokens de tous les réseaux
export async function getAllTokens(address: string): Promise<Token[]> {
  const networks = ['eth-mainnet', 'arb-mainnet', 'base-mainnet']
  
  const tokensPromises = networks.map(network => 
    getTokensForNetwork(address, network)
  )
  
  const tokensArrays = await Promise.all(tokensPromises)
  return tokensArrays.flat()
}