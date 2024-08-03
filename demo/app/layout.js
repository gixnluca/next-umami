import './globals.css'
import UmamiProvider from '../../dist'

export const metadata = {
  title: 'next-umami',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <UmamiProvider websiteId={process.env.UMAMI_WEBSITE_ID} />
      </head>
      <body>{children}</body>
    </html>
  )
}
