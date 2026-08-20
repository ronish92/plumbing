import { Section } from '@/components/ui/section'
import { Columns, Column } from '@/components/ui/columns'
import { Image } from '@/components/ui/image'
import { Heading } from '@/components/ui/heading'
import { Paragraph } from '@/components/ui/paragraph'
import { List, Li } from '@/components/ui/list'

export default function ToiletRepairs() {
  return (
    <Section className="bg-body py-30">
      <Columns gap="gap-10 lg:gap-20">
        <Column>
          <Image
            src="/images/toilet.jpg"
            alt="Hot Water"
            className="w-full object-cover"
            size="large"
            width={180}
            height={180}
          />
        </Column>
     <Column>
  <Heading as="h2">Don't let a faulty toilet ruin your day.</Heading>
  <Paragraph>
   Faulty toilets can cause water wastage, unpleasant odors, and damage to your bathroom floor if not repaired on time. 
  </Paragraph>
  <List>
    <Li>Our verified and experienced plumbers diagnose the issue and restore your toilet to full functionality quickly and safely for you home or your business</Li>
    <Li>Same-day service is available in most areas for urgent plumbing problems to ensure your conveinvce, safety and health.</Li>
    <Li>We also handle complete bathroom plumbing, from pipelining to fresh installations of new water-saving dual-flush commode systems.</Li>
     
  </List>
</Column>

      </Columns>
    </Section>
  )
}
