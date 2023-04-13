import { type AppType } from 'next/app'
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import { Raleway } from 'next/font/google'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import '~/styles/globals.css'

import { api } from '~/utils/api'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'
import { useRouter } from 'next/router'

const raleway = Raleway({
  subsets: ['latin'],
  style: ['normal'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-raleway',
})

const publicPages: Array<string> = ['/']

const MyApp: AppType = ({ Component, pageProps }) => {
  const { pathname } = useRouter()

  const isPublicPage = publicPages.includes(pathname)

  const Content = () => (
    <div
      className={`${raleway.variable} flex h-[100svh] flex-col justify-between font-sans`}
    >
      <Navbar />
      <main className="mb-10 mt-14 flex-shrink-0 flex-grow basis-auto p-4 md:mb-14 md:p-0">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )

  return (
    <>
      <ClerkProvider {...pageProps}>
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
