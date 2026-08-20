import { Section } from '@/components/ui/section'
import { Grid } from '@/components/ui/grid'
import { Card1 } from '@/components/ui/card-1'
import { Heading } from '@/components/ui/heading'

export default function Services() {
  return (
    <Section className="pt-30 lg:pt-20 pb-30 bg-linear-to-b from-body to-body-light">
       <Heading as="h1">Our Services</Heading>
      <Grid className='mt-20'>
        <Card1
          id="1"
          title="Hot Water"
          image="/images/hot.jpg"
          href="/hot-water"
          alt="Hot Water Installation"
        />
        <Card1
          id="2"
          title="Water Leakage"
          image="/images/leakage.jpg"
          href="/water-leakage"
          alt="Fix all your Leakages"
        />
        <Card1
          id="3"
          title=" Clear Blockages"
          image="/images/blockage.png"
          href="/blockage"
          alt="See the transformation process"
        />
        <Card1
          id="4"
          title="Burst Pipes"
          image="/images/burst.jpg"
          href="/burst-pipe"
          alt=" Our pipe experts"
        />
        <Card1
          id="5"
          title="Gas fitting"
          image="/images/gaspipe.png"
          href="/gas-pipes"
          alt="Call our Gas Fitters"
        />
        <Card1
          id="6"
          title="Toilet Repairs"
          image="/images/toilet.jpg"
          href="/toilet-repairs"
          alt="Toilet repairs"
        />
      </Grid>
    </Section>
  )
}
