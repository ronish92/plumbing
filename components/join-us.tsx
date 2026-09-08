"use client"

import { Heading } from '@/components/ui/heading'
import { Paragraph } from '@/components/ui/paragraph'
import { FormUpload } from './ui/form-upload'
import { FormRadioGroup } from './ui/form-radio'
import { FormCheckboxGroup } from './ui/form-checkbox'
import { FormName } from './ui/form-name'
import {
  Form,
  FormInput,
  FormTextArea,
  FormButton,

} from '@/components/ui/simple-form'
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";



export default function Application() {

  const sectionRef = useRef<HTMLDivElement>(null);
  const [alpineTranslateX, setAlpineTranslateX] = useState(-100);
  const [forestTranslateX, setForestTranslateX] = useState(100);
  const [titleOpacity, setTitleOpacity] = useState(1);
  const rafRef = useRef<number | null>(null);

  const updateTransforms = useCallback(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = sectionRef.current.offsetHeight;

    // Calculate progress based on scroll position
    const scrollableRange = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));

    // Alpine comes from left (-100% to 0%)
    setAlpineTranslateX((1 - progress) * -100);

    // Forest comes from right (100% to 0%)
    setForestTranslateX((1 - progress) * 100);

    // Title fades out as blocks come together
    setTitleOpacity(1 - progress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransforms();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransforms]);

  return (
    <>
      <section id="careers" className="bg-background">
        {/* Scroll-Animated Product Grid */}
        <div ref={sectionRef} className="relative" style={{ height: "200vh" }}>
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <div className="relative w-full">
              {/* Title - positioned behind the blocks */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                style={{ opacity: titleOpacity }}
              >
                <h2 className="text-[11vw] font-medium leading-[0.95] tracking-tighter text-foreground md:text-[10vw] lg:text-[8vw] text-center px-12">
                  Good Work Starts With Good People
                </h2>
              </div>

              {/* Product Grid */}
              <div className="relative z-10 grid grid-cols-1 gap-4 px-6 md:grid-cols-2 md:px-12 lg:px-20">
                {/* Alpine Image - comes from left */}
                <div
                  className="relative aspect-4/3 overflow-hidden rounded-2xl"
                  style={{
                    transform: `translate3d(${alpineTranslateX}%, 0, 0)`,
                    WebkitTransform: `translate3d(${alpineTranslateX}%, 0, 0)`,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <Image
                    src="/images/j1.jpeg"
                    alt="Home Services"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-6 left-6">
                    <span className="backdrop-blur-md px-4 py-2 text-sm font-medium rounded-full bg-[rgba(255,255,255,0.2)] text-white">
                      Trusted Work
                    </span>
                  </div>
                </div>

                {/* Forest Image - comes from right */}
                <div
                  className="relative aspect-4/3 overflow-hidden rounded-2xl"
                  style={{
                    transform: `translate3d(${forestTranslateX}%, 0, 0)`,
                    WebkitTransform: `translate3d(${forestTranslateX}%, 0, 0)`,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <Image
                    src="/images/j2.jpeg"
                    alt="Staff pics"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-6 left-6">
                    <span className="backdrop-blur-md px-4 py-2 text-sm font-medium rounded-full bg-[rgba(255,255,255,0.2)] text-white">
                      Work Flexibility
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              We link readily with skilled candidates
            </p>
            <p className="mt-6 leading-relaxed text-muted-foreground text-xl sm:text-2xl md:text-3xl text-center">


              Join a growing team that values skilled work, respects your time, and gives you the opportunity to build a career you can be proud of.
            </p>
          </div>
        </div>
      </section>

      <div className="py-20 md:py-30 bg-body2 relative">
        <Heading
          as="h2"
          textAlign="text-center"
        >
          Join Our Team
        </Heading>

        <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          Tell us a little about yourself, your experience, and the kind of work
          you're interested in. We'll review your application and get in touch if
          there's a good fit.
        </p>
        <Form className=' mx-auto max-w-3xl px-5'>

          <div className="mb-5">
            <Heading as="h3" margin="mb-1">
              Personal Information
            </Heading>
            <Paragraph margin="my-0">
              Let us know how we can reach you.
            </Paragraph>
          </div>

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

          <div className="mt-10 mb-5">
            <Heading as="h3" margin="mb-1">
              Work And Eligibility
            </Heading>
            <Paragraph margin="my-0">
              Tell us about your eligibility and the type of work you're interested in.
            </Paragraph>
          </div>

          <FormRadioGroup
            heading="Are you a Nepali citizen?"
            name="citizenship"
            options={['Yes', 'No']}
            label="Work Authorization"
            required
          />
          <FormCheckboxGroup
            heading="Which position are you interested in?*"
            name="position"
            options={[
              'Plumber',
              'Electrician',
              'Painter',
              'Carpenter',
              'Construction Worker'
            ]}
            label="Position"
          />

          <div className="mt-10 mb-5">
            <Heading as="h3" margin="mb-1">
              Tell Us About Yourself
            </Heading>
            <Paragraph margin="my-0">
              Help us understand your interests and experience.
            </Paragraph>
          </div>
          <FormTextArea
            name="hearAboutUs"
            placeholder="How did you hear about Smart Home Services?*"
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
            placeholder="Describe your relevant job experience in detail:"
            rows={4}
            label="Experience"
          />

          <div className="mt-10 mb-5">
            <Heading as="h3" margin="mb-1">
              Your Documents
            </Heading>
            <Paragraph margin="my-0">
              Share your resume or any other documents that help us understand your
              experience.
            </Paragraph>
          </div>
          <FormUpload
            id="files"
            name="files"
            label="Upload Resume, Portfolio, or Cover Letter"
            multiple
          />
          <div className="mt-10 mb-5">
            <Heading as="h3" margin="mb-1">
              Professional Reference
            </Heading>
            <Paragraph margin="my-0">
              Please provide one person who can speak about your work experience or
              professional skills.
            </Paragraph>
          </div>
        
        
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
          <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
  By submitting this application, you confirm that the information provided
  is accurate to the best of your knowledge.
</p>      
          <FormButton
            name="submit"
            label="Submit Application"
          // submitMessage="Thank you! Your application has been submitted successfully. We will review it and contact you soon."
          />
        </Form>
      </div>
    </>
  )
}
