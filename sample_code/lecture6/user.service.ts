import type { CreateUserDto, UpdateUserDto } from './user.dtos';
import type { User } from './user';
import type { ServiceResult } from './service-result';

export class UserService {
  async create(dto: CreateUserDto): Promise<ServiceResult<User>> {
    try {
      // simulate hashing + persistence
      const user: User = {
        id: 'u_123',
        email: dto.email,
        name: dto.name,
        passwordHash: 'hashed',
        createdAt: new Date(),
      };
      return { kind: 'ok', data: user };
    } catch (e) {
      return { kind: 'error', error: e as Error, code: 'USER_CREATE_FAILED' };
    }
  }

  async update(dto: UpdateUserDto): Promise<ServiceResult<User>> {
    const exists = dto.id === 'u_123';
    if (!exists) return { kind: 'not_found', message: 'User not found' };

    try {
      const updated: User = {
        id: dto.id,
        email: dto.email ?? 'john@example.com',
        name: dto.name ?? 'John',
        passwordHash: 'hashed',
        createdAt: new Date('2020-01-01'),
      };
      return { kind: 'ok', data: updated };
    } catch (e) {
      return { kind: 'error', error: e as Error, code: 'USER_UPDATE_FAILED' };
    }
  }
}
