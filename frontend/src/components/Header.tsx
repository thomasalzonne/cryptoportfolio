import { Hexagon, Moon, Sun, Wallet } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { formatUnits } from 'viem'

export default function Header() {
    const { theme, toggleTheme } = useTheme()
    const { address, isConnected } = useAccount()
    const { connect, connectors } = useConnect()
    const { disconnect } = useDisconnect()
    
    // Récupérer le balance
    const { data: balance } = useBalance({
        address: address,
        query: {
            enabled: !!address,
        }
    })

    const handleConnect = () => {
        const injectedConnector = connectors.find((c) => c.id === 'injected')
        if (injectedConnector) {
            connect({ connector: injectedConnector })
        }
    }

    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`
    }

    // Formater le balance avec formatUnits
    const formattedBalance = balance 
        ? parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4)
        : '0.0000'

    return (
        <div className="w-full flex justify-between">
            <div className='text-gray-900 dark:text-white flex space-x-4'>
                <Hexagon size={30} className='my-auto'/>
                <p className='my-auto'>Thomas</p>
            </div>
            
            <div className='flex space-x-4'>
                {/* Bouton Theme */}
                <div className='my-auto'>
                    <button
                        onClick={toggleTheme}
                        className="p-3 h-12 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 transition-all duration-500 hover:rounded-xl hover:scale-105"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Balance (si connecté) */}
                {isConnected && balance && (
                    <div className='flex items-center gap-2 px-4 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'>
                        <Wallet size={18} />
                        <span className='font-medium'>
                            {formattedBalance} {balance.symbol}
                        </span>
                    </div>
                )}

                {/* Bouton Connect/Disconnect */}
                {isConnected ? (
                    <button
                        onClick={() => disconnect()}
                        className="px-4 h-12 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-all duration-500 hover:rounded-xl hover:scale-105 font-medium"
                    >
                        {formatAddress(address!)}
                    </button>
                ) : (
                    <button
                        onClick={handleConnect}
                        className="px-4 h-12 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 transition-all duration-500 hover:rounded-xl hover:scale-105 font-medium"
                    >
                        Connect
                    </button>
                )}
            </div>
        </div>
    )
}
