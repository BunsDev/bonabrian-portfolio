import { Menu, Transition } from '@headlessui/react'
import classnames from 'classnames'
import { motion } from 'framer-motion'
import { Fragment } from 'react'
import { RiMenuFill } from 'react-icons/ri'

import { navItems } from '@/data'
import { useMounted } from '@/hooks'

import Link from './Link'

const DropdownMenu = () => {
  const mounted = useMounted()

  return (
    <Menu as="div" className="relative inline-block sm:hidden">
      <>
        <Menu.Button className="rounded-full transition-all hover:bg-slate-200 dark:hover:bg-gray-800">
          {mounted && (
            <motion.span
              className="flex h-8 w-8 items-center justify-center text-xl"
              whileTap={{ scale: 0.5 }}
              transition={{ duration: 0.1, ease: 'easeIn' }}
              aria-label="Toggle Menu"
            >
              <RiMenuFill />
            </motion.span>
          )}
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-gray-800 ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Menu.Item key={label} as={Link} href={path}>
                  {({ active }) => (
                    <div
                      className={classnames(
                        'text-base px-4 py-2 hover:bg-slate-100 dark:hover:bg-gray-700',
                        active ? 'bg-slate-100 dark:bg-gray-700' : '',
                      )}
                    >
                      <div className="flex flex-row items-center">
                        <Icon className="mr-2" />
                        <span>{label}</span>
                      </div>
                    </div>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </>
    </Menu>
  )
}

export default DropdownMenu