export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterErrors {
  name?: string[];
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}
