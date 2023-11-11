import { User } from '../entities/user';
import {
  ListUserResponse,
  GetUserResponse,
  CreateUserResponse,
  UpdateUserResponse,
} from '../responses/user';

export function ToGetUserResponse({ id, name, email }: User): GetUserResponse {
  return {
    id,
    name,
    email,
  };
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

export function ToCreateUserResponse({
  id,
  name,
  email,
}: User): CreateUserResponse {
  return { id, name, email };
}

export function ToUpdateUserResponse({
  id,
  name,
  email,
}: User): UpdateUserResponse {
  return { id, name, email };
}
