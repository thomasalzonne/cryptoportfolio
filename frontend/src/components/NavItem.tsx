import { NavLink } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'

interface NavItemProps {
  title: string
  icon: LucideIcon
  to: string
}

export default function NavItem({ title, icon: Icon, to }: NavItemProps) {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) =>
        `flex w-full items-center gap-4 px-4 py-2 rounded-lg transition-colors duration-300 ${
          isActive 
            ? 'bg-slate-200 dark:bg-blue-500 text-white' 
            : 'text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-900'
        }`
      }
    >
      <Icon size={20} className='text-gray-800 dark:text-white'/>
      <p className='text-gray-800 dark:text-white'>{title}</p>
    </NavLink>
  )
}