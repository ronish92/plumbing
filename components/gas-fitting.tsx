import { Section } from '@/components/ui/section'
import { Columns, Column } from '@/components/ui/columns'
import { Image } from '@/components/ui/image'
import { Heading } from '@/components/ui/heading'
import { Paragraph } from '@/components/ui/paragraph'
import { List, Li } from '@/components/ui/list'

export default function GasFitting() {
  return (
    <Section className="bg-body py-30">
      <Columns gap="gap-10 lg:gap-20">
        <Column>
          <Image
            src="/images/gaspipe.png"
            alt="Hot Water"
            className="w-full object-cover"
            size="large"
            width={180}
            height={180}
          />
        </Column>
      <Column>
  <Heading as="h2">Certified LPG fitting. Powering your home and commercial kitchen.</Heading>
  <Paragraph>
    Your infrastructure requires absolute precision. We handle everything from seamless dual-cylinder changeover systems to continuous-flow hot water setups, keeping your operations uninterrupted and your household comfortable.
  </Paragraph>
  <List>
    <Li>Our team designs, installs, and tests high-capacity gas lines tailored for busy restaurants and modern homes alike.</Li>
    <Li>We maximize efficiency by optimizing your cylinder regulators, gas pipes, and appliance connections for steady gas pressure.</Li>
    <Li>Every project concludes with rigorous pressure testing to guarantee total safety.</Li>
  </List>
</Column>

      </Columns>
    </Section>
  )
}
