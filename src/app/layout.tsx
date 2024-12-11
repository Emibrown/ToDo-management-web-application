import Nav from '@/components/Nav';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ToDo management',
  description: 'ToDo management web application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{padding: 0, margin: 0}}>
        <Nav />
        {children}
      </body>
    </html>
  )
}
