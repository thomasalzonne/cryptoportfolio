import type { ReactNode } from 'react'
import Header from './Header'
import Navbar from './Navbar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="p-4">
        <Header />
        <div className="flex gap-4 mt-8">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}