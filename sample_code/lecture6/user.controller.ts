import type { CreateUserDto } from './user.dtos';
import { UserService } from './user.service';

// Narrow unknown to CreateUserDto; in real apps use a schema validator (zod/yup) or a robust guard.
export function isCreateUserDto(x: any): x is CreateUserDto {
  return x && typeof x.email === 'string' && typeof x.name === 'string' && typeof x.password === 'string';
}

export async function createUserHandler(reqBody: unknown) {
  if (!isCreateUserDto(reqBody)) {
    return { status: 400, body: { error: 'Invalid body' } };
  }

  const service = new UserService();
  const result = await service.create(reqBody);

  switch (result.kind) {
    case 'ok':
      return { status: 201, body: result.data };
    case 'not_found':
      return { status: 404, body: { error: result.message } };
    case 'error':
      return { status: 500, body: { error: result.error.message, code: result.code } };
    default: {
      const _exhaustive: never = result;
      return _exhaustive;
    }
  }
}
