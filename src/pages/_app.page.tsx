import { type AppType } from 'next/app'
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import { ptBR } from '@clerk/localizations'
import { Raleway } from 'next/font/google'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import '~/styles/globals.css'

import { api } from '~/utils/api'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Toast } from '~/components/Toast'

const raleway = Raleway({
  subsets: ['latin'],
  style: ['normal'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-raleway',
})

const publicPages: Array<string> = [
  '/',
  '/sign-in/[[...index]]',
  '/sign-up/[[...index]]',
]

const MyApp: AppType = ({ Component, pageProps }) => {
  const { pathname } = useRouter()

  const isPublicPage = publicPages.includes(pathname)

  const Content = () => (
    <>
      <Head>
        <title>Nygma</title>
      </Head>
      <div
        className={`${raleway.variable} flex h-[100svh] flex-col justify-between font-sans`}
      >
        <Navbar />
        <main className="flex-shrink-0 flex-grow basis-auto">
          <Component {...pageProps} />
        </main>
        <Footer />
        <Toast />
      </div>
    </>
  )

  return (
    <>
      <ClerkProvider localization={ptBR} {...pageProps}>
        {isPublicPage ? (
          <Content />
        ) : (
          <>
            <SignedIn>
              <Content />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )}
      </ClerkProvider>
      <ReactQueryDevtools />
    </>
  )
}

export default api.withTRPC(MyApp)
