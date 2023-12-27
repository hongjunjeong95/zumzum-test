import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsArray, IsEnum } from 'class-validator';
import { WeekEnum } from '../persistence/holiday-of-week.entity';

export class CreateHolidayOfWeeksBodyDto {
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
  @IsEnum(WeekEnum, {
    each: true,
  })
  @IsNotEmpty()
  weeks: WeekEnum[];
}
