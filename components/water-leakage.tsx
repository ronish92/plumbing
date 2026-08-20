import { Section } from '@/components/ui/section'
import { Columns, Column } from '@/components/ui/columns'
import { Image } from '@/components/ui/image'
import { Heading } from '@/components/ui/heading'
import { Paragraph } from '@/components/ui/paragraph'
import { List, Li } from '@/components/ui/list'

export default function WaterLeakage() {
  return (
    <Section className="bg-body py-30">
      <Columns gap="gap-10 lg:gap-20">
        <Column>
          <Image
            src="/images/leakage.jpg"
            alt="Hot Water"
            className="w-full object-cover"
            size="large"
            width={180}
            height={180}
          />
        </Column>
        <Column>
          <Heading as="h2">If we can reach the leak, we can definitely fix it</Heading>
          <Paragraph>
            Your building might be telling you it's time for waterproofing. Know the signs and call for Solutions
          </Paragraph>
          <List>
            <Li>Waterproofing at the right time helps prevent water leakage from the walls and protects the building’s structure and integrity.</Li>
            
            <Li> Common causes of leaking pipes include corrosion, joint failure, pressure fluctuations, and physical damage.</Li>
            <Li>
           A leaking pipe can be repaired using methods such as external sealing, clamps, or internal isolation, depending on the size and location of the leak.
           We'll find the effective solution for you.
            </Li>
          </List>
        </Column>
      </Columns>
    </Section>
  )
}
