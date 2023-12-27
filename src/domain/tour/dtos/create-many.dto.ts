import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateToursBodyDto {
  @ApiProperty({
    description: 'tour content id',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  tourContentId: number;

  @ApiProperty({
    description: 'time zone offset',
    example: -540,
  })
  @IsInt()
  @IsNotEmpty()
  timezoneOffset: number;

  @ApiProperty({
    description: 'tour content id',
    example: new Date().toLocaleDateString(),
  })
  @IsString()
  @IsNotEmpty()
  localeStartDateString: string;

  @ApiProperty({
    description: 'tour content id',
    example: new Date().toLocaleDateString(),
  })
  @IsString()
  @IsNotEmpty()
  localeEndDateString: string;
}
