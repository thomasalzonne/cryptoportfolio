import { Hexagon, Moon, Sun } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export default function Header() {
    const { theme, toggleTheme } = useTheme()
    return(
        <>
            <div className="w-full flex justify-between">
                <div className='text-gray-900 dark:text-white flex space-x-4'>
                    <Hexagon size={30} className='my-auto'/>
                    <p className='my-auto'>Thomas</p>
                </div>
                <div className='flex space-x-4'>
                    <div className='my-auto'>
                        <button
                            onClick={toggleTheme}
                            className="p-3 h-12 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 transition-all duration-500 hover:rounded-xl hover:scale-105"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    <button
                            className="p-3 h-12 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 transition-all duration-500 hover:rounded-xl hover:scale-105"
                        >
                            Connect
                    </button>
                </div>
            </div>
        </>
    )
}