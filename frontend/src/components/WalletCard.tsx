import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

interface WalletData {
    day: string
    amount: number
}

export default function WalletCard() {
    const walletHistoryRecovery: WalletData[] = [
        { day: '01', amount: 35000 },
        { day: '02', amount: 34200 },
        { day: '03', amount: 33100 },
        { day: '04', amount: 31800 },
        { day: '05', amount: 30500 },
        { day: '06', amount: 29200 },
        { day: '07', amount: 28400 },
        { day: '08', amount: 27100 },
        { day: '09', amount: 26800 },
        { day: '10', amount: 25900 },
        { day: '11', amount: 26500 },
        { day: '12', amount: 27200 },
        { day: '13', amount: 27800 },
        { day: '14', amount: 28600 },
        { day: '15', amount: 29400 },
        { day: '16', amount: 30100 },
        { day: '17', amount: 30900 },
        { day: '18', amount: 31700 },
        { day: '19', amount: 32500 },
        { day: '20', amount: 33200 },
        { day: '21', amount: 34100 },
        { day: '22', amount: 34800 },
        { day: '23', amount: 35600 },
        { day: '24', amount: 36400 },
        { day: '25', amount: 37100 },
        { day: '26', amount: 37900 },
        { day: '27', amount: 38700 },
        { day: '28', amount: 39500 },
        { day: '29', amount: 40300 },
        { day: '30', amount: 41234 },
    ]

    const currentAmount = walletHistoryRecovery[walletHistoryRecovery.length - 1].amount
    const startAmount = walletHistoryRecovery[0].amount
    const change = ((currentAmount - startAmount) / startAmount) * 100

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-900/95 backdrop-blur-sm border border-purple-500/30 rounded-lg px-3 py-2 shadow-xl">
                    <p className="text-white font-bold text-lg">
                        ${payload[0].value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                </div>
            )
        }
        return null
    }

    const formatYAxis = (value: number) => {
        return `$${(value / 1000).toFixed(0)}k`
    }

    return (
        <div className="relative">
            <div className="mb-6">
                <div className="text-4xl font-bold text-white mb-2">
                    ${currentAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="flex items-center gap-2">
                    <TrendingUp size={20} className="text-green-400" />
                    <span className="text-green-400 font-semibold text-lg">
                        +{change.toFixed(2)}%
                    </span>
                    <span className="text-gray-400 text-sm">This Month</span>
                </div>
            </div>

            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={walletHistoryRecovery}
                        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                    >
                        <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                                <stop offset="50%" stopColor="#6366f1" stopOpacity={0.2}/>
                                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0}/>
                            </linearGradient>

                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>

                        <XAxis 
                            dataKey="day"
                            stroke="#6b7280"
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            tickLine={{ stroke: '#374151' }}
                            axisLine={{ stroke: '#374151' }}
                            tickMargin={10}
                        />

                        <YAxis 
                            stroke="#6b7280"
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            tickLine={{ stroke: '#374151' }}
                            axisLine={{ stroke: '#374151' }}
                            tickFormatter={formatYAxis}
                            tickMargin={10}
                        />

                        <Tooltip 
                            content={<CustomTooltip />}
                            cursor={{
                                stroke: '#8b5cf6',
                                strokeWidth: 1,
                                strokeDasharray: '5 5'
                            }}
                        />
                        
                        <Area 
                            type="monotone"
                            dataKey="amount"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            fill="url(#colorGradient)"
                            filter="url(#glow)"
                            animationDuration={1000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}