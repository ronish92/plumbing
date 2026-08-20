import { Section } from '@/components/ui/section'
import { Grid } from '@/components/ui/grid'
import { Profile1 } from '@/components/ui/profile-1'
import { Heading } from '@/components/ui/heading'
import { Paragraph } from '@/components/ui/paragraph'
import { IconText } from '@/components/ui/icon-text'
import starIcon from '@iconify/icons-lucide/star'

export default function Team() {
  return (
    <Section className="mb-30 mt-30">
         <Heading as="h1">Our Team</Heading>
      <Grid cols="grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <Profile1
          aspect="aspect-[4/5]"
          img="/images/pp.png"
          cite="Sarah Mitchell"
        >
          <Heading
            as="h3"
            margin="mb-0"
          >
            Sarah Mitchell
          </Heading>
          <Heading
            as="h4"
            fontSize="text-lg"
            color="text-accent"
            margin="mb-3"
          >
            Principal Designer & Founder
          </Heading>
          <Paragraph textAlign="text-center">
            With over 15 years of experience, Sarah leads our design vision with
            creativity and strategic insight
          </Paragraph>
          <IconText
            className="uppercase"
            fontWeight="font-semibold"
            fontSize="text-sm"
            textAlign="text-center"
            icon={starIcon}
          >
            New York, NY
          </IconText>
        </Profile1>

        <Profile1
          aspect="aspect-[4/5]"
          img="/images/pp.png"
          cite="Michael Chen"
        >
          <Heading
            as="h3"
            margin="mb-0"
          >
            Michael Chen
          </Heading>
          <Heading
            as="h4"
            fontSize="text-lg"
            color="text-accent"
            margin="mb-3"
          >
            Senior Commercial Designer
          </Heading>
          <Paragraph textAlign="text-center">
            Specializing in office and retail spaces, Michael creates functional
            environments that inspire productivity
          </Paragraph>
          <IconText
            className="uppercase"
            fontWeight="font-semibold"
            fontSize="text-sm"
            textAlign="text-center"
            icon={starIcon}
          >
            San Francisco, CA
          </IconText>
        </Profile1>

        <Profile1
          aspect="aspect-[4/5]"
          img="/images/pp.png"
          cite="Robert Rodriguez"
        >
          <Heading
            as="h3"
            margin="mb-0"
          >
            Robert Rodriguez
          </Heading>
          <Heading
            as="h4"
            fontSize="text-lg"
            color="text-accent"
            margin="mb-3"
          >
            Residential Design Lead
          </Heading>
          <Paragraph textAlign="text-center">
            Robert brings warmth and personality to every home with his
            thoughtful approach to residential design
          </Paragraph>
          <IconText
            className="uppercase"
            fontWeight="font-semibold"
            fontSize="text-sm"
            textAlign="text-center"
            icon={starIcon}
          >
            Austin, TX
          </IconText>
        </Profile1>

        
      
      </Grid>
    </Section>
  )
}
