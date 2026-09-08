export interface IEmployee {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    nidNo: string;
    department?: string;
    employment_type: "Full-Time" | "Part-Time" | "Contract" | "Intern";
    joining_date: string;
    profile_image?: string;
    salary?: number
    emergency_contact?: string
    notes?: string;
    createdBy: string;  
    updatedBy: string;
    deleted_at?: string;
    createdAt?: string;
    updatedAt?: string;
}