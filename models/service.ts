
export interface IReview {

  name: string;
  message: string;
  rating: number;
  created_at: string;
};

export interface IService {
  id: string;
  title: string;
  description: string;
  ratings: number;
  price: number;
  slug?: string;
  filePath?: string;
  worker?: string;
  warranty? : string;
  teamSize? : string;
  response? : string;
  duration? : string;
  features: string;
  isActive: boolean;
  comments: number;
  createdBy: string | null;
  updatedBy?: string | null;
  createdAt: string;
  updatedAt?: string;
  reviews? : IReview[]
}


