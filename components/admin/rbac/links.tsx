'use client';

import Link from 'next/link';
import { FingerprintIcon, KeyIcon, ShieldIcon, UsersIcon } from 'lucide-react';


const NAV_ITEMS = [
  { href: '/admin/users', label: 'Users', icon: UsersIcon },
  { href: '/admin/roles', label: 'Roles', icon: ShieldIcon },
  { href: '/admin/permissions', label: 'Permissions', icon: KeyIcon },
];

export default function Links() {
  

  return (
    <>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-background px-6 py-4 mb-5">
  {/* Logo / Brand */}
  <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
    <FingerprintIcon className="h-6 w-6 text-primary" />
    <span className="text-lg font-semibold tracking-tight text-foreground">Role Based Access Control</span>
  </Link>

  {/* Horizontal Navigation */}
  <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
    {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
      <Link
        key={href}
        href={href}
        prefetch={false}
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </Link>
    ))}
  </nav>
</div>
</>
  )
}