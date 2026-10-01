import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { Paragraph } from '@/components/ui/paragraph'
import { Grid } from '@/components/ui/grid'

import { Label } from '@/components/ui/label'
import { Icon } from '@/components/ui/icon'
import { Quote } from '@/components/ui/quote'
import quoteIcon from '@iconify/icons-lucide/quote'

const testimonials = [
  {
    quote:
    "Great craftsmanship. Watching them work was awesome. I had my solar water heating system repaired and now it's running very smoothly.",
    author: 'Kriti Neupane',
    title: 'Housewife',
    publication: 'Wellness & Lifestyle Review',
  },
  {
    quote:
      "They fixed my Kitchen sink and i loved it how they told me the estimate before hand and final price was even below the estimate.",
    author: 'Sukriti Dhakal',
    title: 'Electrical Engineer',
    publication: 'The Savoy, London',
  },
  {
    quote:
      "The attention to detail is extraordinary. They installed a new commode in my house and they cleaned the station after work .",
    author: 'Ecology Consultant',
    title: 'Beverage Writer',
    publication: 'Modern Drinks Magazine',
  },
]

export default function Testimonial() {
  return (
    <Section className="py-12 md:py-16  bg-[#84cc16]/10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-linear-to-r from-overlay/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-linear-to-l from-overlay/20 to-transparent pointer-events-none"></div>

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
       
        <Heading
          as="h2"
          color="text-overlay-text"
          margin="mb-6"
        >
          What the Clients Say
        </Heading>
        <div className="w-16 h-px bg-overlay-text/20 mx-auto"></div>
      </div>

      {/* Testimonials Grid */}
      <Grid
        cols="grid-cols-1 lg:grid-cols-3"
        gap="gap-20 lg:gap-12"
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="relative group flex flex-col h-full"
          >
            {/* Quote mark */}
            <Icon
              icon={quoteIcon}
              className="absolute -top-4 -left-2 w-16 h-16  text-orange-500 select-none"
            />

            {/* Content */}
            <div className="relative pt-14 flex flex-col h-full">
              <Quote
                color="text-overlay-text/80"
                margin="mb-8"
                className="grow"
              >
                {testimonial.quote}
              </Quote>

              {/* Author */}
              <div className="pt-6 border-t border-overlay-text/10">
                <Heading as="h4"
                  color="text-overlay-text"
                  margin="mb-1"
                >
                  {testimonial.author}
                </Heading>
                <Paragraph
                  color="text-overlay-text/50"
                  fontSize="text-sm"
                  margin="mb-0"
                >
                  {testimonial.title}
                </Paragraph>
                {/* <Paragraph
                  color="text-accent3/80"
                  fontSize="text-sm"
                  margin="mt-1"
                >
                  {testimonial.publication}
                </Paragraph> */}
              </div>
            </div>
          </div>
        ))}
      </Grid>
    </Section>
  )
}
