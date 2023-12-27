import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { Tour } from '../persistence/tour.entity';
import { WeekEnum } from '@domain/holiday-of-week/persistence/holiday-of-week.entity';

export class FindToursQueryDto {
  @ApiProperty({
    description: 'tour content id',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  tourContentId: number;

  @ApiProperty({
    description: 'target month',
    example: 12,
  })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  targetMonth: number;
}

export class TourListResponse {
  tours: TourResponse[];

  constructor(tours: TourResponse[]) {
    this.tours = tours;
  }

  static of(tourList: Tour[]): TourListResponse {
    const tours = tourList.map(TourResponse.of);
    return new TourListResponse(tours);
  }
}

export class TourResponse {
  id: number;
  createdAt: Date;
  date: Date;
  localeDateString: string;
  timezoneOffset: number;
  week: WeekEnum;
  isHoliday: boolean;
  maxReservationsPerDay: number;
  tourContentId: number;

  constructor(tour: {
    id: number;
    date: Date;
    localeDateString: string;
    timezoneOffset: number;
    week: WeekEnum;
    isHoliday: boolean;
    maxReservationsPerDay: number;
    tourContentId: number;
  }) {
    this.id = tour.id;
    this.date = tour.date;
    this.localeDateString = tour.localeDateString;
    this.timezoneOffset = tour.timezoneOffset;
    this.week = tour.week;
    this.isHoliday = tour.isHoliday;
    this.maxReservationsPerDay = tour.maxReservationsPerDay;
    this.tourContentId = tour.tourContentId;
  }

  static of(tour: Tour): TourResponse {
    if (!tour.id) {
      throw new Error('tour id cannot be null');
    }

    return new TourResponse({
      id: tour.id,
      date: tour.date,
      localeDateString: tour.localeDateString,
      timezoneOffset: tour.timezoneOffset,
      week: tour.week,
      isHoliday: tour.isHoliday,
      maxReservationsPerDay: tour.maxReservationsPerDay,
      tourContentId: tour.tourContentId,
    });
  }
}
