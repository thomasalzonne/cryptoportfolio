import type { LucideIcon } from 'lucide-react'

interface ButtonProps {
  title: string
  icon: LucideIcon
  onClick?: () => void
}

export default function Button({ title, icon: Icon, onClick }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="flex w-full items-center gap-2 px-4 py-2 rounded-lg text-gray-800 dark:text-white transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-900 "
    >
      <Icon size={20} />
      <span>{title}</span>
    </button>
  )
}