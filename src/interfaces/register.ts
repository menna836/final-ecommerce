
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}



 export interface RegisterResponse {
status: string;       
  message: string;      
  user?: {
    name: string;
    email: string;
    role: string;
  };
  token?: string;      
}

