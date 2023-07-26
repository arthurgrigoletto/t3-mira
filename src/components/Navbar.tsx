import { useAuth, useUser, SignInButton } from '@clerk/nextjs'
import { User } from '@phosphor-icons/react'
import { clsx } from 'clsx'
import Link from 'next/link'

import { api } from '~/utils/api'

import { Logo } from './Logo'

export function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser()
  const { signOut } = useAuth()
  const trpcContext = api.useContext()

  return (
    <menu
      className={clsx(
        'flex h-16 w-full items-center bg-white p-4 md:justify-between md:px-6',
        {
          'justify-end': isLoaded,
          'justify-center': !isLoaded,
        },
      )}
    >
      <Link href="/" className="hidden md:block">
        <Logo />
      </Link>

      {isLoaded ? (
        <nav className="flex items-center justify-end gap-4 md:gap-6">
          {isSignedIn ? (
            <>
              <Link
                href="/groups"
                className="hidden h-full items-center justify-center gap-2 rounded-2xl p-0 text-base font-bold text-primary-pureDark transition-colors hover:text-primary-dark focus:underline focus:decoration-dotted focus:underline-offset-4 focus:shadow-none focus:outline-none md:inline-flex"
                onMouseEnter={() => {
                  trpcContext.groups.getAll.prefetch({
                    emails: user.emailAddresses.map(
                      (email) => email.emailAddress,
                    ),
                  })
                }}
              >
                Meus grupos
              </Link>
              <Link
                href="/me"
                className="hidden h-10 w-48 items-center justify-center gap-2 rounded-2xl bg-neutral-high-light px-2 py-4 text-base font-bold transition-colors hover:text-primary-dark focus:outline-primary-pureDark md:inline-flex"
              >
                <User size={16} weight="bold" />
                {user.fullName}
              </Link>
              <button
                title="Sair"
                className="inline-flex h-10 w-[75px] items-center justify-center gap-2 rounded-2xl bg-primary-pure px-2 py-4 text-base font-bold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
                onClick={() => signOut()}
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-up">
                <button className="inline-flex h-10 w-32 items-center justify-center gap-2 rounded-2xl border-2 border-solid border-primary-pureDark px-2 py-4 text-base font-bold text-primary-pureDark transition-colors hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary-pureDark">
                  Cadastre-se
                </button>
              </Link>
              <SignInButton>
                <button className="inline-flex h-10 w-[75px] items-center justify-center gap-2 rounded-2xl bg-primary-pure px-2 py-4 text-base font-bold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2">
                  Login
                </button>
              </SignInButton>
            </>
          )}
        </nav>
      ) : null}
    </menu>
  )
}
