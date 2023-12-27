import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpBodyDto {
  @ApiProperty({ description: 'name', example: 'hongjun' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'email', example: 'hongjunjeong95@gmail.com' })
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  email: string;

  @ApiProperty({ description: 'password', example: '12345678' })
  @IsString({ message: '비번은 최소 8자리 이상 16자리 이하입니다.' })
  @Length(8, 16, { message: '비번은 최소 8자리 이상 16자리 이하입니다.' })
  password: string;

  @ApiProperty({
    description: 'password for verification',
    example: '12345678',
  })
  @IsString({ message: '확인 비번은 최소 8자리 이상 16자리 이하입니다.' })
  @Length(8, 16, { message: '확인 비번은 최소 8자리 이상 16자리 이하입니다.' })
  confirmPassword: string;
}
