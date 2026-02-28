'use client'

import { AppSidebar } from '@/components/sidebar/sidebar-component'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { useAuth } from '@/hooks/use-auth'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      return router.push('/')
    }
  }, [isAuthenticated, authLoading, router])

  if (authLoading || !isAuthenticated || !user) {
    return (
      <div className='flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 items-center justify-center'>
        <div className='flex items-center space-x-2'>
          <div className='w-4 h-4 border-2 border-blue-600/30 dark:border-blue-400/30 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin'></div>
          <span className='text-gray-600 dark:text-gray-300'>Carregando...</span>
        </div>
      </div>
    )
  }

  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SidebarProvider>
          <AppSidebar />
            <SidebarInset>
              <header className='flex h-12 shrink-0 items-center gap-2 border-b px-4'>
                <SidebarTrigger className='-ml-1' />
              </header>
              <div className='flex-1 overflow-auto'>{children}</div>
            </SidebarInset>
            <Toaster />
        </SidebarProvider>
      </body>
    </html>
  )
}
