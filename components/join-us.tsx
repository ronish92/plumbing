import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { Paragraph } from '@/components/ui/paragraph'
import { FormUpload } from './ui/form-upload'
import { FormRadioGroup } from './ui/form-radio'
import {FormCheckboxGroup} from './ui/form-checkbox'
import { FormName } from './ui/form-name'
import {
  Form,
  FormInput,
  FormTextArea,
  FormButton,
  
} from '@/components/ui/simple-form'

export default function Application() {
  return (
    <div className="py-20 md:py-30 bg-body2 relative">
      <Heading
        as="h2"
        textAlign="text-center"
      >
        Submit Your Application
      </Heading>
      <Form className='max-w-4xl'>
      
        <FormName
          name1="firstName"
          name2="lastName"
          placeholder1="First name*"
          placeholder2="Last name*"
          label1="First Name"
          label2="Last Name"
          requiredFirst
          requiredSecond
        />
        <FormInput
          name="email"
          type="email"
          placeholder="Email*"
          label="Email"
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
          placeholder="Current Location*"
          label="Location"
          required
        />
        <FormRadioGroup
          heading="Are you authorized to work in the United States?"
          name="workAuthorization"
          options={['Yes', 'No']}
          label="Work Authorization"
          required
        />
        <FormCheckboxGroup
          heading="Which position are you interested in?*"
          name="position"
          options={[
            'Interior Designer',
            'Project Manager',
            'Design Intern',
            'Other',
          ]}
          label="Position"
        />
        <FormTextArea
          name="designPhilosophy"
          placeholder="Describe your design philosophy and approach*"
          label="Design Philosophy"
          rows={4}
          required
        />
        <FormTextArea
          name="hearAboutUs"
          placeholder="How did you hear about Timmerman?*"
          label="How Did You Hear About Us?"
          rows={3}
          required
        />
        <FormTextArea
          name="interestReason"
          placeholder="Why are you interested in joining our team?*"
          rows={3}
          label="Reason for Interest"
          required
        />
        <FormTextArea
          name="experienceDescription"
          placeholder="Describe your relevant interior design experience in detail:"
          rows={4}
          label="Experience"
        />
        <FormUpload
          id="files"
          name="files"
          label="Upload Resume, Portfolio, and Cover Letter (PDF format preferred)"
          multiple
        />
        <Heading
          as="h3"
          margin="mb-0 mt-8"
        >
          Professional References
        </Heading>
        <Paragraph margin="my-0">
          Please provide at least one professional reference
        </Paragraph>
        <Heading
          as="h4"
          margin="mb-0"
        >
          Reference 1
        </Heading>
        <FormName
          name1="ref1FirstName"
          name2="ref1LastName"
          placeholder1="First name*"
          placeholder2="Last name*"
          requiredFirst
          requiredSecond
          label1="Reference 1 First Name"
          label2="Reference 1 Last Name"
        />
        <FormInput
          name="ref1Email"
          type="email"
          placeholder="Email*"
          required
          label="Reference 1 Email"
        />
        <FormInput
          name="ref1Phone"
          type="tel"
          placeholder="Phone*"
          required
          label="Reference 1 Phone"
        />
        <FormInput
          name="ref1Relationship"
          placeholder="Relationship (e.g., Former Supervisor)*"
          required
          label="Reference 1 Relationship"
        />
        <Heading
          as="h4"
          margin="mb-0"
        >
          Reference 2 (Optional)
        </Heading>
        <FormName
          name1="ref2FirstName"
          name2="ref2LastName"
          placeholder1="First name"
          placeholder2="Last name"
          label1="Reference 2 First Name"
          label2="Reference 2 Last Name"
        />
        <FormInput
          name="ref2Email"
          type="email"
          placeholder="Email"
          label="Reference 2 Email"
        />
        <FormInput
          name="ref2Phone"
          type="tel"
          placeholder="Phone"
          label="Reference 2 Phone"
        />
        <FormInput
          name="ref2Relationship"
          placeholder="Relationship"
          label="Reference 2 Relationship"
        />
        <FormButton
          name="submit"
          label="Submit Application"
         // submitMessage="Thank you! Your application has been submitted successfully. We will review it and contact you soon."
        />
      </Form>
    </div>
  )
}
