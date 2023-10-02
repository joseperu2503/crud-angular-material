import { Errors } from "src/app/core/models/errors.model";

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterErrors extends Errors {
  name?: string[];
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}
