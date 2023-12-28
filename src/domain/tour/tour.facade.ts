import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { TourService } from './service/tour.service';
import { CreateToursBodyDto } from './dtos/create-many.dto';
import { SetSpecificHolidayBodyDto } from './dtos/set-specific-holiday.dto';
import { FindToursQueryDto } from './dtos/find-many.dto';
import { Tour } from './persistence/tour.entity';

@Injectable()
export class TourFacade {
  constructor(private readonly tourService: TourService) {}

  @Transactional()
  public async createMany(body: CreateToursBodyDto): Promise<void> {
    const {
      tourContentId,
      timezoneOffset,
      localeStartDateString,
      localeEndDateString,
    } = body;

    await this.tourService.createMany({
      localeEndDateString,
      localeStartDateString,
      timezoneOffset,
      tourContentId,
    });
  }

  @Transactional()
  public async setSpecificHoliday(
    body: SetSpecificHolidayBodyDto,
  ): Promise<void> {
    await this.tourService.setSpecificHoliday(
      body.tourContentId,
      body.localeDateString,
    );
  }

  @Transactional()
  public async getAvailableTours(query: FindToursQueryDto): Promise<Tour[]> {
    return this.tourService.getAvailableTours(
      query.tourContentId,
      query.targetMonth,
    );
  }
}
