import { Reflector } from '@nestjs/core';

// Role type matching Prisma Role enum.
export type Role = 'USER' | 'ADMIN';

// Metadata key for roles required by route handlers.
export const ROLES_KEY = 'roles';

// Custom decorator to specify required roles for route handlers.
export const Roles = Reflector.createDecorator<Role[]>();
