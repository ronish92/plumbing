import { Section } from '@/components/ui/section'
import { Columns, Column } from '@/components/ui/columns'
import { Image } from '@/components/ui/image'
import { Heading } from '@/components/ui/heading'
import { Paragraph } from '@/components/ui/paragraph'
import { List, Li } from '@/components/ui/list'

export default function HotWater() {
  return (
    <Section className="bg-body py-30">
      <Columns gap="gap-10 lg:gap-20">
        <Column>
          <Image
            src="/images/hot.jpg"
            alt="Hot Water"
            className="w-full object-cover"
            size="large"
            width={180}
            height={180}
          />
        </Column>
        <Column>
          <Heading as="h2">Have you ever had to take a cold shower? It's not fun for the rest of us</Heading>
          <Paragraph>
            Installation of a water heater is a little more difficult than repair and is typically best left to a licensed plumber
          </Paragraph>
          <List>
            <Li>Repairing a water heater typically entails replacing broken or old-fashioned parts of the appliance
               like heating element, thermostat, pressure relief valve, amongst others.</Li>
            <Li>
             Remember to turn off the unit's power before beginning any repairs when performing water heater maintenance.
            </Li>
            <Li> Proper installation with our experts will ensure that your water heater runs efficiently,
               so you won’t waste money on unnecessarily high energy bills.</Li>
          </List>
        </Column>
      </Columns>
    </Section>
  )
}
