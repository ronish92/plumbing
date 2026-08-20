import { Section } from '@/components/ui/section'
import { Columns, Column } from '@/components/ui/columns'
import { Image } from '@/components/ui/image'
import { Heading } from '@/components/ui/heading'
import { Quote } from '@/components/ui/quote'
import { Paragraph } from '@/components/ui/paragraph'

export default function ServiceDetails() {
  return (
    <Section className="py-30 bg-gradient-to-b from-body2 to-body-light">
      <Columns
        reverseColumns
        gap="gap-10 lg:gap-20"
      >
        <Column className="aspect-[8/7] relative">
          <Image
            src="/images/gaspipe.png"
            alt="Luxurious bedroom design with sophisticated styling"
            className="absolute bottom-0 right-0 z-10 w-[75%] object-cover"
            width={700}
            height={600}
            size="large"
          />
          <Image
            src="/images/burst.jpg"
            alt="Beautiful kitchen with modern amenities and design"
            className="w-[65%] absolute top-0 left-0 object-cover shadow-2xl"
            rounded="rounded-b-none rounded-t-full"
             width={700}
            height={600}
            size="large"
          />
        </Column>
        <Column>
          <Heading
            as="h3"
            styleAs="h2"
          >
            Personalized Design That Reflects Your Style
          </Heading>
          <Quote>
            Every home tells a story, and we're here to help you tell yours
          </Quote>
          <Paragraph>
            At Speedwell, we believe that great design is personal. Our process
            begins with understanding who you are, how you live, and what makes
            you feel at home. We take the time to learn about your daily
            routines, your aesthetic preferences, and your long-term goals for
            your space. This deep understanding allows us to create designs that
            aren't just beautiful, but truly functional for your unique
            lifestyle.
          </Paragraph>
          <Paragraph>
            Our designers bring years of experience and a keen eye for detail to
            every project. We stay current with the latest trends while
            maintaining a timeless sensibility that ensures your home will feel
            fresh and relevant for years to come. From selecting the perfect
            color palette to sourcing unique furnishings and accessories, we
            handle every aspect with care and expertise.
          </Paragraph>
          <Paragraph>
            Quality craftsmanship and attention to detail are at the heart of
            everything we do.
          </Paragraph>
        </Column>
      </Columns>
    </Section>
  )
}
