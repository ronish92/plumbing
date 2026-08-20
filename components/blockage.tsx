import { Section } from '@/components/ui/section'
import { Columns, Column } from '@/components/ui/columns'
import { Image } from '@/components/ui/image'
import { Heading } from '@/components/ui/heading'
import { Paragraph } from '@/components/ui/paragraph'
import { List, Li } from '@/components/ui/list'

export default function Blockage() {
  return (
    <Section className="bg-body py-30">
      <Columns gap="gap-10 lg:gap-20">
        <Column>
          <Image
            src="/images/blockage.png"
            alt="Hot Water"
            className="w-full object-cover"
            size="large"
            width={180}
            height={180}
          />
        </Column>
        <Column>
          <Heading as="h2">We will get to the bottom of your Blockage</Heading>
          <Paragraph>
            Do you have that one bathroom that always smells vaguely like a sewer even after it’s been scrubbed or that one outlet takes an age to drain?
          </Paragraph>
          <List>
            <Li>It's a mystery. Sometimes it's a build of matters like oils, hair or food scraps, sometimes it's poor pipe configuration or a split causing soil to seep in.</Li>
            
            <Li> People often swear Soap Water, soda with vinear or plungers works best but they aren't always effective  </Li>
            <Li>
          Avoiding drain blockages is important to your wallet and your health in the long term. Enlist the services of our professionals 
            </Li>
          </List>
        </Column>
      </Columns>
    </Section>
  )
}
