import { IService } from "./service";



export interface ICompany {

  id: string;
  userId?: string; 
  name: string;
  logoUrl?: string;
  facebook?: string;
  instagram?: string;
  contactPerson? :string;
  email: string; 
  phone: string;
  phone2: string;
  websiteUrl?: string;
  address: string;
  isVerified: boolean;
  licenseNumber?: string;  
  offeredService: IService[]; 
  ratingAverage?: number; 
  reviewCount?: number;   
  completedJobsCount?: number;
  
}