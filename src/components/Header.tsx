import classnames from 'classnames'

import { useScrollTop } from '@/hooks'

import DropdownMenu from './DropdownMenu'
import Logo from './Logo'
import Navigation from './Navigation'

const Header = () => {
  const isTop = useScrollTop()
  const baseHeaderStyle =
    'w-full sticky z-20 top-0 flex items-center justify-between bg-slate-100/30 dark:bg-gray-900/30 backdrop-filter backdrop-saturate-150 backdrop-blur-md firefox:bg-opacity-100 dark:firefox:bg-opacity-100'

  return (
    <header
      className={classnames(
        baseHeaderStyle,
        isTop ? 'border-none' : 'border-b border-gray-200 dark:border-gray-800',
      )}
    >
      <div className="flex items-center py-6 justify-between w-full max-w-6xl mx-auto px-4">
        <Logo />
        <div className="px-2">
          <Navigation />
          <DropdownMenu />
        </div>
      </div>
    </header>
  )
}

export default Header