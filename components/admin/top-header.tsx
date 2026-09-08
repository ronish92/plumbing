'use client'

import Link from 'next/link'
import { Heading } from '@/components/ui/heading';
import { Logo } from '@/components/ui/logo';
import { Search, HelpCircle, CircleUserRound, KeyIcon } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { DeleteAllCookieWeb } from '@/actions/auth/authCookie';
import { Image } from '../ui/image';
import { 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent, 
  TooltipProvider 
} from '@/components/ui/tooltip'


const navItems = [
  {
    label: 'Dashboard',
    href: '/admin',
  },
  {
    label: 'Services',
    href: '/admin/services',
  },
  {
    label: 'Messages',
    href: '/admin/messages',
  },
  {
    label: 'Workers',
    href: '/admin/workers',
  },
]

export default function TopHeader() {

    const router = useRouter();
      const pathname = usePathname()
    const OnClearCookies = async () => {
        await DeleteAllCookieWeb()
        router.replace("/login");
        router.refresh();
    };


    return <header className="mb-3 sm:mb-4 lg:mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
            <a className="h-7 w-7 sm:h-9 sm:w-9 overflow-hidden rounded-full bg-transparent" href='/'>
                <Logo

                    width={80}
                    height={50}
                />

            </a>
            <Heading as='h3'>Smart Home Services </Heading>
        </div>

          <nav className="flex flex-wrap items-center gap-0.5 sm:gap-1">
        {navItems.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-2.5 py-1.5 text-[10px] font-medium transition-colors sm:px-4 sm:py-2 sm:text-xs md:px-5 ${
                isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-black hover:bg-gray-200'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
             <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
  type="button"
  onClick={OnClearCookies}
  className="relative flex items-center justify-center p-1 rounded-md transition-transform hover:scale-105 active:scale-95 focus:outline-none"
>
   
  <Image 
    src="/images/logout.png" // Replace with your file path
    alt="Logout button"
    width={35} 
    height={35}
    className="object-contain"
  />
  </button>
  </TooltipTrigger>
  <TooltipContent side="bottom" sideOffset={6} className="bg-orange-500 text-white font-medium">
          <p>Logout</p>
        </TooltipContent>
  </Tooltip>
  </TooltipProvider>


        </div>
    </header>
}