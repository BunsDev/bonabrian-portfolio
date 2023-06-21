'use client'

import { Dialog, Transition } from '@headlessui/react'
import { useSearchParams } from 'next/navigation'
import type { BuiltInProviderType } from 'next-auth/providers'
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import { Fragment, useEffect, useState } from 'react'

import cn from '@/lib/cn'

import Container from './container'
import LoginProviderButton from './login-provider-button'

const SignInCard = ({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams?.get('error')) {
      setIsOpen(true)
    }
  }, [searchParams])

  return (
    <Container>
      <div
        className={cn(
          'flex flex-col items-center space-y-2 justify-items-center xl:space-y-0',
        )}
      >
        <div className={cn('p-8 prose max-w-none', 'dark:prose-dark')}>
          <div
            className={cn('flex flex-col items-center justify-between gap-4')}
          >
            {providers &&
              Object.values(providers).map((provider) => (
                <LoginProviderButton key={provider.id} provider={provider} />
              ))}
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className={cn('fixed inset-0 z-20 overflow-y-auto')}
          onClose={() => setIsOpen(false)}
        >
          <div className={cn('min-h-screen px-4 text-center')}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className={cn('fixed inset-0')} />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={cn(
                  'inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl',
                )}
              >
                <Dialog.Title
                  as="h3"
                  className={cn('text-lg font-medium leading-6 text-gray-900')}
                >
                  Problem signing in
                </Dialog.Title>
                <div className={cn('mt-2')}>
                  <p className={cn('text-sm text-gray-500')}>
                    An unexpected problem occurred while I&apos;m trying to log
                    you in. Please try with another providers.
                  </p>
                  <code className={cn('text-sm text-red-500')}>
                    Error: {searchParams?.get('error')}
                  </code>
                </div>

                <div className={cn('mt-4')}>
                  <button
                    type="button"
                    className={cn(
                      'inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500',
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    OK
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Container>
  )
}

export default SignInCard
