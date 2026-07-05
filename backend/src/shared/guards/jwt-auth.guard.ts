import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// JwtAuthGuard: ตัวป้องกันสิทธิ์การเข้าถึงข้อมูล (Guard) ระดับส่วนกลาง โดยใช้ Passport JWT Strategy
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
