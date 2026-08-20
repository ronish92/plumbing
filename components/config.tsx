import heartIcon from '@iconify/icons-lucide/heart'

import facebookIcon from '@iconify/icons-lucide/facebook'
import instagramIcon from '@iconify/icons-lucide/instagram'
import phoneIcon from '@iconify/icons-lucide/phone'
import emailOutlineIcon from '@iconify/icons-lucide/mail-check'
import { Icon } from '@/components/ui/icon'

export interface FooterLink {
  href: string
  label: string
}

export interface SocialLink {
  name: string
  href: string
  icon: { body: string; width?: number; height?: number }
}

/**
 * Social media links configuration
 */
export const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/speedwell',
    icon: facebookIcon,
  },
  {
    name: 'Instagram',
    href: 'http://instagram.com/speedwell',
    icon: instagramIcon,
  },
  {
    name: 'Phone',
    href: 'tel:5551234567',
    icon: phoneIcon,
  },
  {
    name: 'Email',
    href: 'mailto:me@your-company.com',
    icon: emailOutlineIcon,
  },
]

/**
 * Left column navigation links
 */
export const leftColumn: FooterLink[] = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Residential Design', href: '/residential' },
  { label: 'Commercial Design', href: '/commercial' },
  { label: 'Kitchen & Bath', href: '/kitchen-bath' },
  { label: 'Space Planning', href: '/space-planning' },
  { label: 'Color Consultation', href: '/color-consultation' },
  { label: 'Furniture Selection', href: '/furniture' },
]

/**
 * Right column navigation links
 */
export const rightColumn: FooterLink[] = [
  { label: 'Our Story', href: '/residential' },
  { label: 'Meet the Team', href: '/commercial' },
  { label: 'Client Testimonials', href: '/testimonials' },
  { label: 'Before & After', href: '/before-after' },
  { label: 'Project Management', href: '/project-management' },
  { label: 'Contact', href: '/contact' },
  { label: 'Join Our Team', href: '/join-our-team' },
]

/**
 * Footer description text
 */
export const description =
  'Situated in the heart of the Design District on Main Street, our studio is steps away from premier showrooms and artisan workshops.'

/**
 * Copyright business name
 */
export const copyrightName = 'SR Plumbing Services'

/**
 * Webmaster credit
 */
export function WebMaster() {
  return (
    <>
      Built with{' '}
      <Icon
        icon={heartIcon}
        className="text-red-500"
      />{' '}
      by the team at{' '}
      <a
        className="underline hover:text-contrast-light"
        href="https://gallop.software/"
      >
        Evocode Solutions
      </a>
    </>
  )
}
