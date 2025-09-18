export interface AuthResponse {
  message: string;
statusMsg?: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
}
