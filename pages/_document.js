import { Html, Head, Main, NextScript } from 'next/document'
import { AuthProvider } from '@/utilities/AuthContext'


export default function Document() {
  return (
    <Html lang="en">
      <AuthProvider>
        <Head>
        </Head>
        <body color='yellow'>
          <Main />
          <NextScript />
      </body>
      </AuthProvider>
    </Html>
  )
}
