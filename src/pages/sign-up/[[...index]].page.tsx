import { SignUp as ClerkSignUp } from '@clerk/nextjs'
import { NextPage } from 'next'

const SignUp: NextPage = () => {
  return (
    <main className="flex h-full items-center justify-center py-14">
      <ClerkSignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        afterSignUpUrl="/sign-in"
        appearance={{
          elements: {
            logoBox: 'hidden',
            headerBackIcon: 'text-primary-pure font-semibold',
            headerBackLink: 'text-primary-pure font-semibold',
            identityPreviewEditButton:
              'text-primary-pure hover:text-primary-dark transitions-color',
            formButtonPrimary:
              'font-bold bg-primary-pure rounded-2xl transitions-color hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2',
            formFieldAction:
              'text-primary-pure font-bold transitions-color hover:no-underline hover:text-primary-dark focus:ring-0 focus:underline focus:decoration-dotted focus:underline-offset-4 focus:shadow-none focus:outline-none',
            footer: 'flex items-center justify-center',
            footerActionLink:
              'text-primary-pure font-bold transitions-color hover:no-underline hover:text-primary-dark focus:ring-0 focus:underline focus:decoration-dotted focus:underline-offset-4 focus:shadow-none focus:outline-none',
          },
        }}
      />
    </main>
  )
}

export default SignUp
