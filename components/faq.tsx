import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { Paragraph } from '@/components/ui/paragraph'
import { Accordion } from '@/components/ui/accordion'


interface FAQItem {
  id: string | number
  question: string
  answer: string
}



const faqs = [
  {
    id: 1,
    question: "For Homeowners",
    answer:
      "A simple way to manage the services your home needs. Book plumbing, electrical, painting, construction, pet care, and other home services whenever you need them, or choose a recurring package for ongoing maintenance.",
  },
  {
    id: 2,
    question: "For Property Owners & Landlords",
    answer:
      "Manage maintenance across your properties with a single service platform. Schedule repairs, routine maintenance, and other services while keeping your properties cared for without having to coordinate multiple service providers yourself.",
  },
  {
    id: 3,
    question: "For Offices & Businesses",
    answer:
      "Keep your workplace running smoothly with services designed for business environments. From electrical and plumbing maintenance to painting, repairs, and other facility needs, businesses can arrange services through one platform.",
  },
  {
    id: 4,
    question: "For Hotels & Hospitality",
    answer:
      "Hospitality properties have ongoing maintenance needs. Our platform helps hotels, restaurants, and other hospitality businesses arrange the services they need to maintain their facilities and respond to day-to-day requirements.",
  },
  {
    id: 5,
    question: "For Facilities & Property Managers",
    answer:
      "Manage recurring maintenance across buildings and facilities with centralized service scheduling. Our platform can help coordinate multiple service categories and recurring requirements without relying on separate providers for every task.",
  },
  {
    id: 6,
    question: "Monthly & Annual Plans",
    answer:
      "For customers with ongoing maintenance needs, we offer monthly and annual packages for both homes and businesses. Choose a plan based on your property and service requirements and have regular maintenance organized for you.",
  },
]

export default function FAQ() {
  return (
    <Section className="bg-body pt-20 pb-20">
      <div className="mx-auto max-w-4xl">
        <Heading textAlign="text-center" as="h2">
          What We Do
        </Heading>

        {faqs.map((faq) => (
          <Accordion
            key={faq.id}
            headingText={faq.question}
          >
            <Paragraph className='px-10'>{faq.answer}</Paragraph>
          </Accordion>
        ))}
      </div>
    </Section>
  )
}
