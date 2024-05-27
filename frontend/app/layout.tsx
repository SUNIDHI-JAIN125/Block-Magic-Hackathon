import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppContextProvider } from '../contextAPI';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ringle',
  description: 'Nft',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>

        {children}
        </AppContextProvider>

      </body>
    </html>
  )
}
