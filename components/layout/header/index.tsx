import HeaderClient from './header-client';
import Navigation from './navigation';
import { ModeToggle } from './theme-toggle';
import UserDropDown from './user';

type HeaderProps = {
  navigation?: boolean;
  isHidden?: boolean;
};

export default async function Header({ navigation = true }: HeaderProps) {
  return (
    <header className='bg-background sticky top-0 z-50 w-full border-b shadow-sm'>
      <div className=' py-2 md:py-4 px-2 md:px-6'>
        <div className='flex items-center justify-between gap-6'>
          {/* Left Section: Mobile Menu Trigger & Logo */}
          <div className='flex-none'>
            <HeaderClient />
          </div>

          {/* Middle Section: Desktop Navigation */}
          {navigation && (
            <div className='hidden flex-1 justify-center md:flex'>
              <Navigation />
            </div>
          )}

          {/* Right Section: Search, Theme, Notifications, Cart, User */}
          <div className='flex flex-none items-center justify-end gap-4'>
            {/* Desktop Search Bar */}

            {/* Removed MobileSearch component */}

            <div className='flex items-center gap-2'>
              {/* Desktop Theme Switcher */}
              <div className='hidden md:block'>
                <ModeToggle />
              </div>

              <UserDropDown />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
