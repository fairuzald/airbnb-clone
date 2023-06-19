import './globals.css'
import { Nunito } from 'next/font/google'

const font = Nunito({ 
  subsets: ['latin'], 
});


export const metadata = {
  title: 'Airbnb Clone',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
