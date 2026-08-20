import { Section } from '@/components/ui/section'
import { Columns, Column } from '@/components/ui/columns'
import { Image } from '@/components/ui/image'
import { Heading } from '@/components/ui/heading'
import { Paragraph } from '@/components/ui/paragraph'
import { Quote } from '@/components/ui/quote'
import { Accordion } from '@/components/ui/accordion'
import { Li, List } from '@/components/ui/list'

export default function FAQ() {
  return (
    <Section className="bg-body pt-20 pb-20">
      {/* <Columns
        className="mb-30"
        align="items-start"
        gap="gap-10 lg:gap-20"
      >
        <Column>
          <Image
            src="/gigi.jpg"
            alt="Creative team collaborating on brand strategy"
            className="w-full object-cover shadow-2xl max-w-lg mx-auto"
            rounded="rounded-t-full"
            size="large"
            height={100}
            width={100}
          />
        </Column>
        <Column>
          <Heading
            as="h3"
            styleAs="h3"
            margin="mb-2"
            fontSize="text-3xl"
            color="text-accent5"
          >
            Who We Are
          </Heading>
          <Heading
            as="h4"
            styleAs="h2"
          >
            A Creative Agency Built on Strategy
          </Heading>
          <Paragraph>
            We are a team of designers, strategists, and storytellers passionate
            about creating brands that resonate. Our approach combines creative
            excellence with strategic thinking to deliver branding solutions
            that not only look beautiful but also drive real business results.
            From startups to established businesses, we partner with clients who
            are ready to make their mark.
          </Paragraph>
          <Paragraph>
            Our studio thrives on collaboration and innovation. We believe the
            best brands emerge from deep understanding of your business,
            audience, and market. By blending research, creativity, and
            strategic insight, we craft brand identities that are distinctive,
            memorable, and built to last. Every project we take on is an
            opportunity to push boundaries and create something exceptional.
          </Paragraph>
          <Quote>
            Great brands are born from the intersection of creativity, strategy,
            and authentic storytelling
          </Quote>
        </Column>
      </Columns> */}
      <div className="mx-auto max-w-4xl">
        <Heading
          textAlign="text-center"
          as="h2"
        >
          What We Do
        </Heading>
        <Accordion headingText="Residential Homeowners">
          {/* <Heading as="h4">Our Approach</Heading> */}
          <Paragraph>
            For residential homeowners, we handle everything from clogged kitchen sinks and 
            toilets to blocked downspouts and sump pump repairs, ensuring your entire wastewater system runs efficiently.
          </Paragraph>
          {/* <Heading as="h4">Services Include</Heading>
          <List className="mb-8">
            <Li>Logo design and brand mark development</Li>
            <Li>Brand guidelines and style guides</Li>
            <Li>Color palette and typography systems</Li>
            <Li>Business card and stationery design</Li>
            <Li>Packaging and product design</Li>
            <Li>Brand refresh and evolution</Li>
          </List> */}
        </Accordion>
        <Accordion headingText="Food and Hospitality">
        
          <Paragraph>
            In the food and hospitality sector, we provide specialized services such as grease trap maintenance and
             Bio Dispensers to prevent disruptive clogs and ensure a clean, sanitary environment.
          </Paragraph>
        
        </Accordion>
        <Accordion headingText="Property and Facility Managers">
         
          <Paragraph>
          Property and facility managers rely on our tailored maintenance plans and 
          cutting-edge technology to maintain the functionality and safety of their properties.
          </Paragraph>
         
        </Accordion>
      </div>
    </Section>
  )
}
