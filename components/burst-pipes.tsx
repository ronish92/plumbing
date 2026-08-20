import { Section } from '@/components/ui/section'
import { Columns, Column } from '@/components/ui/columns'
import { Image } from '@/components/ui/image'
import { Heading } from '@/components/ui/heading'
import { Paragraph } from '@/components/ui/paragraph'
import { List, Li } from '@/components/ui/list'

export default function BurstPipes() {
  return (
    <Section className="bg-body py-30">
      <Columns gap="gap-10 lg:gap-20">
        <Column>
          <Image
            src="/images/burst.jpg"
            alt="Hot Water"
            className="w-full object-cover"
            size="large"
            width={180}
            height={180}
          />
        </Column>
        <Column>
          <Heading as="h2">A burst pipe doesn't always announce itself with a flood in your living room.</Heading>
          <Paragraph>
           A faint hissing in the walls, a mysterious damp spot on the ceiling, or a sudden drop in water pressure.
           Ignoring these subtle cluesand it becomes a full-blown disaster.
          </Paragraph>
          <List>
            <Li>The main culprits are freezing temperatures, excessive water pressure, and the natural aging of your plumbing system.</Li>
            
            <Li> If you’re dealing with a minor leak or a small split in a pipe, using putty, repair tape or tying it with rubber can be a lifesaver but these are just first-aids </Li>
            <Li>
          While that can-do spirit is admirable, do it yourself can accidentally make a bad situation much worse. Call a professional.
            </Li>
          </List>
        </Column>
      </Columns>
    </Section>
  )
}
