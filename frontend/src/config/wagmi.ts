import { http, createConfig } from 'wagmi'
import { mainnet, arbitrum, base } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, arbitrum, base],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
})

// Networks supportés
export const SUPPORTED_NETWORKS = {
  ethereum: {
    id: mainnet.id,
    name: 'Ethereum',
    alchemyNetwork: 'eth-mainnet',
    color: '#627EEA'
  },
  arbitrum: {
    id: arbitrum.id,
    name: 'Arbitrum',
    alchemyNetwork: 'arb-mainnet',
    color: '#28A0F0'
  },
  base: {
    id: base.id,
    name: 'Base',
    alchemyNetwork: 'base-mainnet',
    color: '#0052FF'
  }
}