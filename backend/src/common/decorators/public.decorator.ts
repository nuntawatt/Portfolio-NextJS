import { SetMetadata } from '@nestjs/common';

/** Metadata key for public routes. */
export const IS_PUBLIC_KEY = 'isPublic';

/** Marks route as publicly accessible. */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
