import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ApproveReservationTokenBodyDto {
  @ApiProperty({
    description: 'reservation token',
    example: 'alskdflkwrlisjdfiolxjzf2139hxkjfh',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
