'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const NAME_MAP: Record<string, string> = {
  dashboard: 'Dashboard',
  profile: 'Profile',
  products: 'Products',
  add: 'Add',
  edit: 'Edit',
  signin: 'Sign In',
  signup: 'Sign Up',
};

function isIdSegment(seg: string) {
  if (!seg) return false;
  // numeric id or long hex uuid-ish
  return /^[0-9]+$/.test(seg) || /^[0-9a-fA-F-]{6,}$/.test(seg);
}

export function Breadcrumbs() {
  const pathname = usePathname() ?? '/';

  const segments = pathname.split('/').filter(Boolean);

  // If no segments show Home (or Dashboard when at /dashboard)
  if (segments.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((seg, idx) => {
          const href = `/${segments.slice(0, idx + 1).join('/')}`;
          const isLast = idx === segments.length - 1;
          const label =
            NAME_MAP[seg] ??
            (isIdSegment(seg)
              ? 'Details'
              : decodeURIComponent(seg.replace(/-/g, ' ')));

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem
                className={idx === 0 ? 'hidden md:block' : undefined}
              >
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator
                  className={idx === 0 ? 'hidden md:block' : undefined}
                />
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
