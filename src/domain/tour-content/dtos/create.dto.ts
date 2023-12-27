import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTourContentBodyDto {
  @ApiProperty({
    description: 'content',
    example: 'helkjasdflkwalfjsakldfjsldkfjsadl',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
