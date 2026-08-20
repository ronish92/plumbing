import { Container } from '@/components/ui/container'
import { Gradient } from '@/components/ui/gradient'
import { Logo } from '@/components/ui/logo'
import Link from 'next/link'
import { Icon } from '@/components/ui/icon'
import { Paragraph } from '@/components/ui/paragraph'
import { Heading } from '@/components/ui/heading'
import { Image } from './ui/image'

import {
  socialLinks,
 
  rightColumn,
  description,
  copyrightName,
  WebMaster,
} from './config'
import type { FooterLink, SocialLink } from './config'

function SocialLinks() {
  return (
    <div className="flex justify-center md:justify-start">
      {socialLinks.map((item: SocialLink) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-lime hover:bg-body2/30 rounded-lg transition-colors duration-200 p-2"
          aria-label={item.name}
        >
          <Icon
            icon={item.icon}
            className="h-7 w-7"
          />
        </a>
      ))}
    </div>
  )
}

function Copyright() {
  return (
  <Paragraph
  fontSize="text-sm"
  margin="mb-0"
  textAlign="text-center lg:text-left"
>
  &copy; {new Date().getFullYear()} {copyrightName}
</Paragraph>
  )
}

export function Footer() {
  return (
    <footer className="">
      <Gradient className="relative">
        <div className="absolute inset-2 rounded-4xl bg-body/50 z-0" />
        <Container className="pt-20 z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-y-0 pb-6 lg:gap-24 items-center">

            {/* Center content - first in HTML order, but visually centered on desktop */}
            <div className="flex flex-col items-center lg:order-2">
              <Logo
                className="mb-7"
                width={220}
              />
              <Heading
                as="h4"
                styleAs="h3"
                fontSize="text-xl"
                textAlign="text-center"
                className="italic"
              >
                {description}
              </Heading>
              <SocialLinks />
               <div className="flex justify-center items-center py-6 mt-1 text-center">
            <div>
              <Copyright />
              <Paragraph
                fontSize="text-sm"
                margin="mb-0"
                className="flex items-center justify-center gap-1"
              >
                <WebMaster />
              </Paragraph>
            </div>
          </div>
            </div>

            {/* Left column - second in HTML order, but visually left on desktop */}
            <div className="gap-x-7 lg:order-1">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-primary-600">
              DOWNLOAD APP NOW
            </h2>
            <p className="mt-2 mb-2 text-sm md:text-base text-navy-600 leading-relaxed max-w-md">
              Book your desired services through our mobile application,
              available on both Android and iPhone.
            </p>
          </div>
          <Image 
          src ='/images/google.png'
          alt = 'Google Playstore'
          height={100}
          width={200}
              className='mb-3'
          >

          </Image>

           <Image 
          src ='/images/apple.png'
          alt = 'Apple Playstore'
          height={100}
          width={200}
      
          >

          </Image>
            </div>

            {/* Right column - third in HTML order, visually right on desktop */}
            <div className="gap-x-8 lg:order-3">
              <div>
                <ul className="text-center space-y-4 text-sm">
                  {rightColumn.map((link: FooterLink) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-medium text-contrast hover:text-contrast-light"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
         
        </Container>
      </Gradient>
    </footer>
  )
}
