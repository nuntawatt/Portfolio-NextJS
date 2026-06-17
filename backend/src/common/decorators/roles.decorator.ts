import { Reflector } from '@nestjs/core';

/** Role type matching Prisma Role enum. */
export type Role = 'USER' | 'ADMIN';

/** Metadata key for roles. */
export const ROLES_KEY = 'roles';

/** Decorator to set required roles on route handlers. */
export const Roles = Reflector.createDecorator<Role[]>();
