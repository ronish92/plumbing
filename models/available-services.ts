export interface ILandingService {
  id: string;
  title: string;
  subtitle: string;
  filePath: string;
  features: string[];
  category: string;
  isActive: boolean;
  createdBy: string | null;
  updatedBy?: string | null;
 
}
