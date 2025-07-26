export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photoUrl?: string;
  role?: string[];
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string;
  roles: string[];
  refreshToken?: string;
}