import { GetUserResponse } from './user';

export class SignInResponse {
  token: string;
  user: GetUserResponse;
}
