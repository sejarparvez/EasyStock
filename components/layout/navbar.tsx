'use client';
import { Menu, Package, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import { ModeToggle } from './theme-toggle';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <nav className='border-b border-border bg-card sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='flex items-center gap-2 shrink-0'>
            <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
              <Package className='w-5 h-5 text-primary-foreground' />
            </div>
            <span className='text-lg sm:text-xl font-bold text-foreground'>
              EasyStock
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-6'>
            <ModeToggle />
            <Button variant='ghost' asChild>
              <Link href='#features'>Features</Link>
            </Button>
            <Button variant='ghost' asChild>
              <Link href='#benefits'>Benefits</Link>
            </Button>
            <Button asChild>
              <Link href='/dashboard'>Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type='button'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='md:hidden p-2 hover:bg-muted rounded-lg transition-colors'
            aria-label='Toggle menu'
          >
            {mobileMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className='md:hidden border-t border-border mt-4 pt-4 space-y-3'>
            <Button
              variant='ghost'
              asChild
              className='w-full justify-start text-sm'
            >
              <Link href='#features'>Features</Link>
            </Button>
            <Button
              variant='ghost'
              asChild
              className='w-full justify-start text-sm'
            >
              <Link href='#benefits'>Benefits</Link>
            </Button>
            <Button asChild className='w-full text-sm'>
              <Link href='/dashboard'>Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
