import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getAllTokens, type Token } from '../services/alchemy'
import { Loader2, Filter, Eye, EyeOff } from 'lucide-react'
import { SUPPORTED_NETWORKS } from '../config/wagmi'
import PageLayout from '../components/pages/PageLayout'
import PageHeader from '../components/pages/Header'

export default function Portfolio() {
  const { address, isConnected } = useAccount()
  const [tokens, setTokens] = useState<Token[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSpam, setShowSpam] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState<string>('all')

  useEffect(() => {
    if (isConnected && address) {
      loadAllTokens()
    }
  }, [isConnected, address])

  const loadAllTokens = async () => {
    if (!address) return
    
    setIsLoading(true)
    try {
      // Récupérer tous les tokens (Ethereum, Arbitrum, Base)
      const allTokens = await getAllTokens(address)
      
      // Optionnel : Récupérer Hyperliquid si besoin
      // const hlTokens = await getHyperliquidBalances(address)
      
      setTokens(allTokens)
    } catch (error) {
      console.error('Error loading tokens:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Filtrer les tokens
  const filteredTokens = tokens
    .filter(token => {
      if (!showSpam && token.isSpam) return false
      if (selectedNetwork !== 'all' && token.network !== selectedNetwork) return false
      return true
    })
    .sort((a, b) => {
      // ETH natif toujours en premier
      if (a.isNative && !b.isNative) return -1
      if (!a.isNative && b.isNative) return 1
      // Ensuite par balance (du plus élevé au plus bas)
      return parseFloat(b.formattedBalance) - parseFloat(a.formattedBalance)
    })

  // Grouper par réseau
  const tokensByNetwork = filteredTokens.reduce((acc, token) => {
    if (!acc[token.network]) acc[token.network] = []
    acc[token.network].push(token)
    return acc
  }, {} as Record<string, Token[]>)

  if (!isConnected) {
    return (
      <PageLayout>
        <PageHeader title="Portfolio" />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-4">
              Please connect your wallet to view your portfolio
            </p>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <PageHeader title="Portfolio" />

      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 transition-colors duration-300">
        {/* Header avec filtres */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Your Tokens
          </h2>

          <div className="flex gap-3">
            {/* Filtre réseau */}
            <select
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-700"
            >
              <option value="all">All Networks</option>
              {Object.entries(SUPPORTED_NETWORKS).map(([key, network]) => (
                <option key={key} value={network.alchemyNetwork}>
                  {network.name}
                </option>
              ))}
            </select>

            {/* Toggle spam */}
            <button
              onClick={() => setShowSpam(!showSpam)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {showSpam ? <Eye size={16} /> : <EyeOff size={16} />}
              {showSpam ? 'Hide' : 'Show'} Spam
            </button>

            {/* Refresh */}
            <button
              onClick={loadAllTokens}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} />
                  Loading...
                </span>
              ) : (
                'Refresh'
              )}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Tokens</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {filteredTokens.length}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Networks</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {Object.keys(tokensByNetwork).length}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Spam Filtered</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {tokens.filter(t => t.isSpam).length}
            </div>
          </div>
        </div>

        {/* Liste des tokens */}
        {isLoading && tokens.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : filteredTokens.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No tokens found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(tokensByNetwork).map(([network, networkTokens]) => {
              const networkInfo = Object.values(SUPPORTED_NETWORKS).find(
                n => n.alchemyNetwork === network
              )

              return (
                <div key={network}>
                  {/* Header du réseau */}
                  <div className="flex items-center gap-2 mb-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: networkInfo?.color }}
                    />
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {networkInfo?.name || network}
                    </h3>
                    <span className="text-sm text-gray-500">
                      ({networkTokens.length} tokens)
                    </span>
                  </div>

                  {/* Tokens du réseau */}
                  <div className="space-y-2">
                    {networkTokens.map((token) => (
                      <div
                        key={`${token.network}-${token.contractAddress}`}
                        className={`flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                          token.isSpam ? 'opacity-50' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {token.logo ? (
                            <img
                              src={token.logo}
                              alt={token.symbol}
                              className="w-10 h-10 rounded-full"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                              {token.symbol.slice(0, 2)}
                            </div>
                          )}

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {token.name}
                              </span>
                              {token.isSpam && (
                                <span className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded">
                                  Spam?
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {token.symbol}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {token.formattedBalance}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {token.symbol}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </PageLayout>
  )
}