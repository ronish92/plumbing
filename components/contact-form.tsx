import { Section } from '@/components/ui/section'
import { Columns, Column } from '@/components/ui/columns'
import { Form, FormInput, FormTextArea, FormButton } from '@/components/ui/simple-form'
import { Heading } from '@/components/ui/heading'
import { Paragraph } from '@/components/ui/paragraph'
import { Grid } from '@/components/ui/grid'
import { CardContact } from '@/components/ui/card-contact'
import phoneIcon from '@iconify/icons-lucide/phone'
import starIcon from '@iconify/icons-lucide/star'
import mapPinIcon from '@iconify/icons-lucide/map-pin'





export default function Contact() {
  return (
    <>
      <ContactForm />
    
    </>
  )
}



function ContactForm() {
  return (
    
     

      <Section className="py-6 md:py-10  relative">
       <Heading textAlign="text-center" as="h2">
        Get in Touch
      </Heading>
        <Columns
          reverseColumns={false}
          align="items-start"
        >
          {/* CONTACT FORM */}
          <Column className="mb-6 md:mb-0">
            <Form>
              <FormInput
                name="name"
                type="text"
                placeholder="Name*"
                label="Name"
                required
              />

              <FormInput
                name="phone"
                type="tel"
                placeholder="Phone*"
                label="Phone"
                required
              />

              <FormInput
                name="location"
                type="text"
                placeholder="Location"
                label="Location"
                required
              />

              <FormTextArea
                name="message"
                placeholder="Tell us about your problem"
                rows={4}
                label="Message"
                required
              />

              <FormButton
                name="submit"
                label="Send Message"
              />
            </Form>
          </Column>

          {/* CONTACT INFORMATION */}
          <Column className="flex flex-col gap-6">
            <Paragraph>
              At SR Plumbing, we are committed to providing top-quality
              plumbing services with honesty and integrity. Our team is ready
              to handle your plumbing needs with precision and care. Schedule
              your service now for fast and reliable results.
            </Paragraph>

            <Grid
              cols="grid-cols-1"
              gap="gap-4"
            >
              <CardContact
                className="group"
                href="tel:5551234567"
                heading="Call"
                text="(555) 123-4567"
                icon={phoneIcon}
                iconColor="text-accent bg-accent3 group-hover:bg-accent3-dark"
              />

              <CardContact
                href="https://www.google.com/maps"
                heading="Get Directions"
                text="Visit Our Location"
                icon={mapPinIcon}
              />
            </Grid>
          </Column>
        </Columns>
      </Section>
   
  );
}



