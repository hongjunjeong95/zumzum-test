import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { jwtConstants } from '../constant';

@Injectable()
export class CustomerJwtAuthGuard extends AuthGuard(
  jwtConstants.JWT_CUSTOMER,
) {}
