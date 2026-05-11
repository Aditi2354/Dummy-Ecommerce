export interface UserType {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export interface LoginType {
  email: string;
  password: string;
}