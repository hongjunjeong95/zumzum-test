import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class SetSpecificHolidayBodyDto {
  @ApiProperty({
    description: 'tour content id',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  tourContentId: number;

  @ApiProperty({
    description: 'locale date string',
    example: new Date().toLocaleDateString(),
  })
  @IsString()
  @IsNotEmpty()
  localeDateString: string;
}
