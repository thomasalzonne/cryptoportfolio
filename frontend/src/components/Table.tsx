import { TrendingUp, TrendingDown } from 'lucide-react'

interface CryptoData {
  rank: number
  name: string
  symbol: string
  price: string
  change: number
  marketCap: string
  icon: string
}

export default function Table() {
  const cryptos: CryptoData[] = [
    { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: '$43,256.32', change: 2.5, marketCap: '$850B', icon: '₿' },
    { rank: 2, name: 'Ethereum', symbol: 'ETH', price: '$2,287.43', change: -1.2, marketCap: '$275B', icon: 'Ξ' },
    { rank: 3, name: 'Solana', symbol: 'SOL', price: '$98.21', change: 5.8, marketCap: '$42B', icon: '◎' },
    { rank: 4, name: 'Cardano', symbol: 'ADA', price: '$0.52', change: -0.5, marketCap: '$18B', icon: '₳' },
    { rank: 5, name: 'Polkadot', symbol: 'DOT', price: '$7.43', change: 3.2, marketCap: '$9B', icon: '●' },
  ]

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <div className="grid grid-cols-[60px_1fr_150px_150px_150px] gap-4 py-4 px-6 text-sm font-medium text-gray-400">
          <div>#</div>
          <div>Market</div>
          <div className="text-right">Price</div>
          <div className="text-right">24h Change</div>
          <div className="text-right">Market Cap</div>
        </div>
        
        <div className="bg-slate-400/10 rounded-lg overflow-hidden">
          {cryptos.map((crypto, index) => (
            <div 
              key={crypto.rank}
              className={`grid grid-cols-[60px_1fr_150px_150px_150px] gap-4 py-4 px-6 hover:bg-white/5 transition-colors`}
            >
              <div className="text-gray-400">{crypto.rank}</div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center text-lg flex-shrink-0">
                  {crypto.icon}
                </div>
                <div>
                  <div className="font-medium text-white">{crypto.name}</div>
                  <div className="text-sm text-gray-400">{crypto.symbol}</div>
                </div>
              </div>
              
              <div className="text-right font-medium text-white">
                {crypto.price}
              </div>
              
              <div className="text-right">
                <div className={`flex items-center justify-end gap-1 ${
                  crypto.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {crypto.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span className="font-medium">{crypto.change >= 0 ? '+' : ''}{crypto.change}%</span>
                </div>
              </div>
              
              <div className="text-right text-gray-400">
                {crypto.marketCap}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden space-y-4">
        {cryptos.map((crypto) => (
          <div 
            key={crypto.rank}
            className="bg-slate-400/25 rounded-lg p-4 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center text-xl">
                  {crypto.icon}
                </div>
                <div>
                  <div className="font-medium text-white text-lg">{crypto.name}</div>
                  <div className="text-sm text-gray-400">{crypto.symbol}</div>
                </div>
              </div>
              <div className="text-sm text-gray-400">#{crypto.rank}</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Price</span>
                <span className="font-medium text-white text-lg">{crypto.price}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">24h Change</span>
                <div className={`flex items-center gap-1 ${
                  crypto.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {crypto.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span className="font-medium">{crypto.change >= 0 ? '+' : ''}{crypto.change}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Market Cap</span>
                <span className="text-gray-300">{crypto.marketCap}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}