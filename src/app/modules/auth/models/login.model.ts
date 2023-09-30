import { Errors } from "src/app/core/models/errors.model";

export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginErrors extends Errors {
  email?: string[];
  password?: string[];
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}
