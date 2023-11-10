import { User } from '../entities/users';
import { CreateUserResponse } from '../responses/users/create';
import { ListUserResponse } from '../responses/users/list';

export function ToCreateUserResponse({
  id,
  name,
  email,
}: User): CreateUserResponse {
  return { id, name, email };
}

export function ToListUserResponse({
  id,
  name,
  email,
}: User): ListUserResponse {
  return {
    id,
    name,
    email,
  };
}
