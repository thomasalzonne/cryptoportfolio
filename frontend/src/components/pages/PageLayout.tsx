import type { ReactNode } from 'react'

interface PageLayoutProps {
  children: ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex flex-col w-full">
      {children}
    </div>
  )
}