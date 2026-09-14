export interface JobApplicationModel {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string

  workAuthorization: string
  position: string[]

  hearAboutUs: string
  interestReason: string
  experienceDescription?: string

  ref1FirstName: string
  ref1LastName: string
  ref1Email: string
  ref1Phone: string
  ref1Relationship: string
}