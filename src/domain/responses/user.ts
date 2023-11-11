export class BaseUserResponse {
  id: string;
  name: string;
  email: string;
}

export class GetUserResponse extends BaseUserResponse {}

export class ListUserResponse extends BaseUserResponse {}

export class CreateUserResponse extends BaseUserResponse {}

export class UpdateUserResponse extends BaseUserResponse {}
