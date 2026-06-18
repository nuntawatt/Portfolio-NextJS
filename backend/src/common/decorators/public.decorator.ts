import { SetMetadata } from '@nestjs/common';

// Key used to mark routes as public.
export const IS_PUBLIC_KEY = 'isPublic';

// Custom decorator to mark routes as public.
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
