import { WeekEnum } from '@domain/tour/persistence/tour.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsArray,
  IsEnum,
  ArrayMaxSize,
} from 'class-validator';

export class SetHolidayOfWeeksBodyDto {
  @ApiProperty({
    description: 'tour content id',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  tourContentId: number;

  @ApiProperty({
    description: 'week list',
    example: [WeekEnum.SATURDAY, WeekEnum.SUNDAY],
    isArray: true,
  })
  @IsArray()
  @ArrayMaxSize(7)
  @IsEnum(WeekEnum, {
    each: true,
  })
  @IsNotEmpty()
  weeks: WeekEnum[];
}
