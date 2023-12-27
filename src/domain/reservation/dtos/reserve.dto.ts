import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class ReserveBodyDto {
  @ApiProperty({
    description: 'tour id',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  tourId: number;
}
