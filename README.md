# next-umami

Simple integration for https://nextjs.org and https://umami.is analytics.

## Usage

### Include the Analytics Script

To enable Umami analytics in your Next.js app you'll need to expose the Umami context.

If you're using the [app router](https://nextjs.org/docs/getting-started/project-structure#app-routing-conventions) include `UmamiProvider` inside the root layout:

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

If you're using the [pages router](https://nextjs.org/docs/getting-started/project-structure#pages-routing-conventions) include the `UmamiProvider` inside `_app.js`:

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

#### `UmamiProvider` Props

| Name         | Type                 | Description                                                                                                                                                                                                                                                                               |
| ------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `websiteId`  | `string`             | Website ID found in Umami dashboard. https://umami.is/docs/collect-data.                                                                                                                                                                                                                  |
| `src?`       | `string`             | By default it's set to https://cloud.umami.is/script.js. You can override this in case you're self-hosting.                                                                                                                                                                               |
| `hostUrl?`   | `string`             | By default, Umami will send data to wherever the script is located. You can override this to send data to another location. [See in docs](https://umami.is/docs/tracker-configuration#data-host-url).                                                                                     |
| `autoTrack?` | `boolean`            | By default, Umami tracks all pageviews and events for you automatically. You can disable this behavior and track events yourself using the tracker functions. [See in docs](https://umami.is/docs/tracker-configuration#data-auto-track).                                                 |
| `domains?`   | `string[]`           | If you want the tracker to only run on specific domains, you can add them to your tracker script. This is a comma delimited list of domain names. Helps if you are working in a staging/development environment. [See in docs](https://umami.is/docs/tracker-configuration#data-domains). |
| `onLoad?`    | `(e: any) => void`   | Execute code after Umami has loaded.                                                                                                                                                                                                                                                      |
| `onReady?`   | `() => void \| null` | Execute code after Umami's load event when it first loads and then after every subsequent component re-mount.                                                                                                                                                                             |
| `onError?`   | `(e: any) => void`   | Handle errors if Umami fails to load.                                                                                                                                                                                                                                                     |

## Send Custom Events

The `useUmami` hook exposes two functions that you can call on your website if you want more control over your tracking.
By default, everything is automatically collected, but you can disable this using `autoTrack={false}` in `UmamiProvider` and send the data yourself.

### Pageview

Default properties are automatically sent. If you wish to override any property, use the `umami.pageView` function like this:

```jsx
import { useUmami } from 'next-umami'

export default function Page() {
  const umami = useUmami()

  // Default Pageview
  umami.pageView()
  
  // OR

  // Custom Pageview
  umami.pageView({
    url: '/custom-pageview',
  })

  return <h1>My Page</h1>
}
```

#### `Pageview` Props

| Name        | Type     | Description                        |
| ----------- | -------- | ---------------------------------- |
| `hostname?` | `string` | Hostname of server                 |
| `language?` | `string` | Browser language                   |
| `referrer?` | `string` | Page referrer                      |
| `screen?`   | `string` | Screen dimensions (e.g. 1920x1080) |
| `title?`    | `string` | Page title                         |
| `url?`      | `string` | Page URL                           |

### Events

Access the `umami.event` function like this:

```jsx
import { useUmami } from 'next-umami'

export default function UmamiButtons() {
  const umami = useUmami()

  return (
    <>
      {/* Basic Event */}
      <button onClick={() => umami.event('Basic Event')}>Submit</button>

      {/* Custom Event */}
      <button
        onClick={() =>
          umami.event('Custom Event', {
            userAgent: window.navigator.userAgent,
          })
        }
      >
        Submit with custom data
      </button>
    </>
  )
}
```

#### `Event` Props

| Name    | Type                               | Description               |
| ------- | ---------------------------------- |---------------------------|
| `name`  | `string`                           | Name of the event         |
| `data?` | `Record<string, string \| number>` | Custom data for the event |

- Numbers have a max precision of 4.
- Strings have a max length of 500.
- Arrays are converted to a String, with the same max length of 500.
- Objects have a max of 50 properties. Arrays are considered 1 property.
