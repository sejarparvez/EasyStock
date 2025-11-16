/** biome-ignore-all lint/suspicious/noArrayIndexKey: <error */
'use client';

import {
  ArrowRight,
  BarChart3,
  Clock,
  Menu,
  Package,
  ShieldCheck,
  X,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='min-h-screen bg-background'>
      {/* Navigation - Added mobile hamburger menu and improved responsive layout */}
      <nav className='border-b border-border bg-card sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <div className='flex items-center gap-2 shrink-0'>
              <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                <Package className='w-5 h-5 text-primary-foreground' />
              </div>
              <span className='text-lg sm:text-xl font-bold text-foreground'>
                easystock
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center gap-6'>
              <Button variant='ghost' asChild className='text-sm'>
                <Link href='#features'>Features</Link>
              </Button>
              <Button variant='ghost' asChild className='text-sm'>
                <Link href='#benefits'>Benefits</Link>
              </Button>
              <Button asChild size='sm'>
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

      {/* Hero Section - Improved mobile layout and spacing */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-24'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
          <div className='space-y-6 sm:space-y-8'>
            <div className='space-y-3 sm:space-y-4'>
              <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance'>
                Inventory Management Made Simple
              </h1>
              <p className='text-base sm:text-lg text-muted-foreground leading-relaxed'>
                Streamline your glass shop operations with real-time inventory
                tracking, intelligent analytics, and seamless organization.
              </p>
            </div>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
              <Button
                size='lg'
                asChild
                className='bg-primary hover:bg-primary/90 w-full sm:w-auto'
              >
                <Link
                  href='/dashboard'
                  className='flex items-center justify-center gap-2'
                >
                  Start Free Trial
                  <ArrowRight className='w-4 h-4' />
                </Link>
              </Button>
              <Button
                size='lg'
                variant='outline'
                asChild
                className='w-full sm:w-auto'
              >
                <Link href='#demo'>See Demo</Link>
              </Button>
            </div>
            <p className='text-xs sm:text-sm text-muted-foreground'>
              No credit card required. Start managing inventory in minutes.
            </p>
          </div>

          {/* Hero Image */}
          <div className='relative hidden sm:block'>
            <div className='bg-linear-to-br from-primary/20 to-accent/20 rounded-2xl p-8 aspect-square flex items-center justify-center border border-border'>
              <div className='space-y-4 w-full'>
                <div className='bg-card rounded-lg p-4 border border-border space-y-3'>
                  <div className='h-3 bg-primary/30 rounded w-1/3'></div>
                  <div className='space-y-2'>
                    <div className='h-2 bg-muted rounded w-full'></div>
                    <div className='h-2 bg-muted rounded w-5/6'></div>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <div className='bg-card rounded-lg p-4 border border-border space-y-2'>
                    <div className='h-3 bg-accent/30 rounded'></div>
                    <div className='h-2 bg-muted rounded w-3/4'></div>
                  </div>
                  <div className='bg-card rounded-lg p-4 border border-border space-y-2'>
                    <div className='h-3 bg-primary/30 rounded'></div>
                    <div className='h-2 bg-muted rounded w-3/4'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Changed to single column on mobile, responsive grid */}
      <section
        id='features'
        className='bg-card border-y border-border py-12 sm:py-20 lg:py-24'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4'>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground'>
              Powerful Features
            </h2>
            <p className='text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto'>
              Everything you need to manage your glass shop inventory
              efficiently
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
            {[
              {
                icon: BarChart3,
                title: 'Real-Time Analytics',
                description:
                  'Monitor inventory levels, sales trends, and stock movements with live dashboards and detailed reports.',
              },
              {
                icon: Clock,
                title: 'Instant Updates',
                description:
                  'Get instant notifications for low stock alerts, orders, and critical inventory changes across your shop.',
              },
              {
                icon: Zap,
                title: 'Smart Automation',
                description:
                  'Automate routine tasks, set reorder points, and let easystock handle repetitive inventory management.',
              },
              {
                icon: ShieldCheck,
                title: 'Secure & Reliable',
                description:
                  'Enterprise-grade security with encrypted data, regular backups, and 99.9% uptime guarantee.',
              },
              {
                icon: Package,
                title: 'Multi-Location',
                description:
                  'Manage inventory across multiple glass shop locations with centralized control and tracking.',
              },
              {
                icon: Zap,
                title: 'Easy Integration',
                description:
                  'Seamlessly integrate with your existing POS systems, suppliers, and business tools.',
              },
            ].map((feature, idx) => (
              <Card
                key={idx}
                className='p-6 border border-border hover:border-primary/50 transition-colors'
              >
                <feature.icon className='w-8 h-8 text-primary mb-4' />
                <h3 className='text-base sm:text-lg font-semibold text-foreground mb-3'>
                  {feature.title}
                </h3>
                <p className='text-sm sm:text-base text-muted-foreground leading-relaxed'>
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Improved mobile spacing and single column layout */}
      <section
        id='benefits'
        className='max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-24'
      >
        <div className='space-y-12 lg:space-y-16'>
          {[
            {
              title: 'Cut Operational Costs',
              description:
                'Reduce stockouts and overstock situations. Optimize inventory levels to minimize waste and maximize profits.',
              stats: '42% average cost reduction',
            },
            {
              title: 'Save Time Daily',
              description:
                'Eliminate manual inventory counts and spreadsheets. Automate tedious tasks and focus on growing your business.',
              stats: '10+ hours saved per week',
            },
            {
              title: 'Better Decision Making',
              description:
                'Access comprehensive analytics and insights. Make data-driven decisions about stock, pricing, and sourcing.',
              stats: '3x faster reporting',
            },
          ].map((benefit, idx) => (
            <div
              key={idx}
              className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'
            >
              {idx % 2 === 0 ? (
                <>
                  <div className='space-y-4 sm:space-y-6 order-2 lg:order-1'>
                    <h3 className='text-2xl sm:text-3xl font-bold text-foreground'>
                      {benefit.title}
                    </h3>
                    <p className='text-base sm:text-lg text-muted-foreground leading-relaxed'>
                      {benefit.description}
                    </p>
                    <div className='pt-4 border-t border-border'>
                      <p className='text-xl sm:text-2xl font-bold text-primary'>
                        {benefit.stats}
                      </p>
                    </div>
                  </div>
                  <div className='bg-secondary rounded-xl h-48 sm:h-64 border border-border order-1 lg:order-2'></div>
                </>
              ) : (
                <>
                  <div className='bg-secondary rounded-xl h-48 sm:h-64 border border-border order-1'></div>
                  <div className='space-y-4 sm:space-y-6 order-2'>
                    <h3 className='text-2xl sm:text-3xl font-bold text-foreground'>
                      {benefit.title}
                    </h3>
                    <p className='text-base sm:text-lg text-muted-foreground leading-relaxed'>
                      {benefit.description}
                    </p>
                    <div className='pt-4 border-t border-border'>
                      <p className='text-xl sm:text-2xl font-bold text-primary'>
                        {benefit.stats}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Improved mobile text sizing and button width */}
      <section className='bg-primary text-primary-foreground py-12 sm:py-20 lg:py-24'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8'>
          <div className='space-y-3 sm:space-y-4'>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-balance'>
              Ready to Transform Your Inventory Management?
            </h2>
            <p className='text-base sm:text-lg text-primary-foreground/90'>
              Join glass shop owners who are already saving time and money with
              easystock.
            </p>
          </div>
          <Button
            size='lg'
            variant='secondary'
            asChild
            className='bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full sm:w-auto'
          >
            <Link
              href='/dashboard'
              className='flex items-center justify-center gap-2'
            >
              Start Your Free Trial
              <ArrowRight className='w-4 h-4' />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer - Completely responsive footer with single column on mobile */}
      <footer className='border-t border-border bg-card'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <div className='w-6 h-6 bg-primary rounded flex items-center justify-center shrink-0'>
                  <Package className='w-4 h-4 text-primary-foreground' />
                </div>
                <span className='font-bold text-foreground text-sm sm:text-base'>
                  easystock
                </span>
              </div>
              <p className='text-xs sm:text-sm text-muted-foreground'>
                Inventory management for glass shops, made easy.
              </p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Security'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'Status'] },
            ].map((col, idx) => (
              <div key={idx} className='space-y-3 sm:space-y-4'>
                <h4 className='font-semibold text-foreground text-sm sm:text-base'>
                  {col.title}
                </h4>
                <ul className='space-y-2'>
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        href='#'
                        className='text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors'
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className='border-t border-border pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs sm:text-sm text-muted-foreground'>
            <p>&copy; 2025 easystock. All rights reserved.</p>
            <div className='flex gap-4 sm:gap-6'>
              <Link href='#' className='hover:text-primary transition-colors'>
                Privacy
              </Link>
              <Link href='#' className='hover:text-primary transition-colors'>
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
