import { User } from '../entities/users';
import { CreateUserResponse } from '../responses/users/create';

export function ToCreateUserResponse(user: User): CreateUserResponse {
  return user;
}
