import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConfigType } from '@nestjs/config';
import { Response } from 'express';

import JwtConfig from '@common/config/variables/jwt.config';
import { ApiResponse } from '@common/dto/api-response.dto';
import { SignUpBodyDto } from './dto/auth-sign-up.dto';
import { SignInBodyDto } from './dto/auth-sign-in.dto';
import { AuthService } from '../service/auth.service';
import { UserRole } from '@common/entity/base-user-entity';

@Controller({
  path: '/seller-api/v1/auth',
})
@ApiTags('auth')
export class SellerAuthController {
  constructor(
    private readonly authService: AuthService,

    @Inject(JwtConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JwtConfig>,
  ) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Sign up for seller' })
  async signUp(@Body() body: SignUpBodyDto): Promise<ApiResponse<void>> {
    await this.authService.signUp(UserRole.SELLER, {
      name: body.name,
      email: body.email,
      password: body.password,
      confirmPassword: body.confirmPassword,
    });

    return ApiResponse.success(null);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Sign in for seller' })
  async signIn(
    @Body() body: SignInBodyDto,
    @Res() response: Response,
  ): Promise<ApiResponse<void>> {
    const authToken = await this.authService.signIn(UserRole.SELLER, {
      email: body.email,
      password: body.password,
    });

    response
      .cookie('Authorization', authToken, {
        maxAge: this.jwtConfig.accessTokenExpireDuration,
        httpOnly: true,
        path: '/',
      })
      .send(ApiResponse.success(null));

    return;
  }
}
