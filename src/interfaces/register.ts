interface User {
  name: string;
  email: string;
  role: "user" | "admin"; // حسب الـ roles الممكنة
}

 export interface RegisterResponse {
  message: string;
  user: User;
  token: string;
}

