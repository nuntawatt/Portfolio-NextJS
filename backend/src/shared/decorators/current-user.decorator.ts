import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// สร้าง Decorator สำหรับดึงข้อมูลผู้ใช้ปัจจุบันจาก Request
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as Record<string, unknown> | undefined;

    if (!user) {
      return undefined;
    }

    return data ? user[data] : user;
  },
);
