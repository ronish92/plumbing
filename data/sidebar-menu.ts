import {
  CreditCard, Users2, Home,
  ShoppingCart, Package, FileText, Database,
   ImageIcon, Monitor,  MessageSquare,
  Play,  Tag,
  Edit, Minus, Check, Clock,
  LucideIcon,
  Mail,
  
  Building2,

} from "lucide-react"

export interface SubMenuItem {
  id: string
  label: string
  href: string
  icon: LucideIcon
  badge?: string
  isNew?: boolean
  children?: SubMenuItem[]
}

export interface MenuItem {
  id: string
  label: string
  href?: string
  icon: LucideIcon 
  badge?: string
  isNew?: boolean
  children?: SubMenuItem[]
}

interface MenuSection {
  id: string
  label: string
  items: MenuItem[]
}

export const menuData: MenuSection[] = [
  {
    id: "overview",
    label: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        icon: Home,
      },
    ],
  },
  {
    id: "ecommerce",
    label: "Work Portal",
    items: [
      {
        id: "products",
        label: "Services",
        href: "/products",
        icon: Package,
        children: [
          {
            id: "all-services",
            label: "Popular Services",
            href: "/company/services",
            icon: Package,
          },
          {
            id: "categories",
            label: "Categories",
            href: "/products/categories",
            icon: Tag,
            children: [
              {
                id: "electronics",
                label: "Electricity",
                href: "/products/categories/electronics",
                icon: Monitor,
              },
              {
                id: "clothing",
                label: "Plumbing",
                href: "/products/categories/clothing",
                icon: ShoppingCart,
              },
              {
                id: "books",
                label: "Construction",
                href: "/products/categories/books",
                icon: FileText,
              },
            ],
          },
          {
            id: "inventory",
            label: "Landing Services",
            href: "/company/landing-services",
            icon: Database,
          },
        
        ],
      },
      {
        id: "orders",
        label: "Bookings",
        href: "/orders",
        icon: ShoppingCart,
        badge: "5",
        children: [
          {
            id: "all-orders",
            label: "All Bookings",
            href: "/company/bookings",
            icon: ShoppingCart,
          },
          {
            id: "pending",
            label: "Pending",
            href: "/orders/pending",
            icon: Clock,
            badge: "3",
          },
          {
            id: "delivered",
            label: "Completed",
            href: "/orders/delivered",
            icon: Check,
          },
        ],
      },
      {
        id: "customers",
        label: "Customers",
        href: "/customers",
        icon: Users2,
        children: [
          {
            id: "all-customers",
            label: "All Customers",
            href: "/customers/all",
            icon: Users2,
          },

          {
            id: "reviews",
            label: "Customer Reviews",
            href: "/customers/reviews",
            icon: MessageSquare,
          },
        ],
      },
       {
        id: "customers",
        label: "Messages",
        href: "/company/messages",
        icon: Mail,      
      },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    items: [
      {
        id: "payments",
        label: "Payments",
        href: "/payments",
        icon: CreditCard,
        children: [
          {
            id: "payment-methods",
            label: "Payment Methods",
            href: "/payments/methods",
            icon: CreditCard,
          },
          {
            id: "payment-history",
            label: "Payment History",
            href: "/payments/history",
            icon: Clock,
          },
          {
            id: "refunds",
            label: "Refunds",
            href: "/payments/refunds",
            icon: Minus,
          },
        ],
      },
    ],
  },
  {
    id: "content",
    label: "Content Management",
    items: [
      {
        id: "pages",
        label: "Contents",
        href: "/pages",
        icon: FileText,
        children: [
          {
            id: "banners",
            label: "Banners",
            href: "/company/banners",
            icon: FileText,
          },
          {
            id: "testimonials",
            label: "Testimonials",
            href: "/company/testimonials",
            icon: FileText,
          },
          {
            id: "categories",
            label: "Categories",
            href: "/company/categories",
            icon: Tag,
          },
          {
            id: "aboutUs",
            label: "About Us",
            href: "/company/about-us",
            icon: Tag,
          },
        
        ],
      },
      {
        id: "media",
        label: "Media",
        href: "/media",
        icon: ImageIcon,
        children: [
          {
            id: "images",
            label: "Images",
            href: "/media/images",
            icon: ImageIcon,
          },
          {
            id: "videos",
            label: "Videos",
            href: "/media/videos",
            icon: Play,
          },        
        ],
      },

    ],
  },
  {
    id: "team",
    label: "Workers & Team",
    items: [
      {
        id: "workers",
        label: "Workers",
        href: "/company/workers",
        icon: Users2,
      },
      {
        id: "company",
        label: "Companies",
        href: "/company/companies",
        icon: Building2,
      },
    




    ],
  },

]