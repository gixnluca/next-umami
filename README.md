# next-umami

Simple integration for https://nextjs.org and https://umami.is analytics.

## Usage

### Include the Analytics Script

To enable Umami analytics in your Next.js app you'll need to expose the Umami context, `<UmamiProvider />`, at the top level of your application inside [`_app.js`](https://nextjs.org/docs/advanced-features/custom-app):
```jsx
// pages/_app.js
import UmamiProvider from 'next-umami'

export default function MyApp({ Component, pageProps }) {
  return (
    <UmamiProvider websiteId="a3d85e62-dc8b-4d4b-bd1f-e8a71b55d3cf">
      <Component {...pageProps} />
    </UmamiProvider>
  )
}
```

If you want to enable Umami analytics only on a single page you can wrap the page in a `UmamiProvider` component:
```jsx
// pages/home.js
import UmamiProvider from 'next-umami'

export default function Home() {
  return (
    <UmamiProvider websiteId="a3d85e62-dc8b-4d4b-bd1f-e8a71b55d3cf">
      <h1>My Site</h1>
      {/* ... */}
    </UmamiProvider>
  )
}
```

If are using [the app directory](https://beta.nextjs.org/docs/routing/fundamentals#the-app-directory) include `UmamiProvider` inside the root layout:
```jsx
// app/layout.js
import UmamiProvider from 'next-umami'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <UmamiProvider websiteId="a3d85e62-dc8b-4d4b-bd1f-e8a71b55d3cf" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

#### `UmamiProvider` Props
| Name         | Description                                                                                                                                                                                                                                                                               |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `websiteId`  | Website ID found in Umami dashboard. https://umami.is/docs/collect-data.                                                                                                                                                                                                                  |
| `src?`       | By default it's set to https://cloud.umami.is/script.js. You can override this in case you're self-hosting.                                                                                                                                                                               |
| `hostUrl?`   | By default, Umami will send data to wherever the script is located. You can override this to send data to another location. [See in docs](https://umami.is/docs/tracker-configuration#data-host-url).                                                                                     |
| `autoTrack?` | By default, Umami tracks all pageviews and events for you automatically. You can disable this behavior and track events yourself using the tracker functions. [See in docs](https://umami.is/docs/tracker-configuration#data-auto-track).                                                 |
| `domains?`   | If you want the tracker to only run on specific domains, you can add them to your tracker script. This is a comma delimited list of domain names. Helps if you are working in a staging/development environment. [See in docs](https://umami.is/docs/tracker-configuration#data-domains). |
| `onLoad?`    | Execute code after Umami has loaded.                                                                                                                                                                                                                                                      |
| `onReady?`   | Execute code after Umami's load event when it first loads and then after every subsequent component re-mount.                                                                                                                                                                             |
| `onError?`   | Handle errors if Umami fails to load.                                                                                                                                                                                                                                                     |
