import './globals.css'
import UmamiProvider from 'next-umami'

export const metadata = {
  title: 'next-umami',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <UmamiProvider
          websiteId={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          domains="next-umami.vercel.app"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
