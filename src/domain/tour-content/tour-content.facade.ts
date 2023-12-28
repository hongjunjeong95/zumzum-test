import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { TourContentService } from './service/tour-content.service';
import { CreateTourContentBodyDto } from './dtos/create.dto';
import { SetHolidayOfWeeksBodyDto } from './dtos/set-holidays-of-week.dto';

@Injectable()
export class TourContentFacade {
  constructor(private readonly tourContentService: TourContentService) {}

  @Transactional()
  public async create(
    sellerId: number,
    body: CreateTourContentBodyDto,
  ): Promise<void> {
    await this.tourContentService.create(body.content, sellerId);
  }

  @Transactional()
  public async setHolidaysOfWeek({
    tourContentId,
    weeks,
  }: SetHolidayOfWeeksBodyDto): Promise<void> {
    await this.tourContentService.setHolidaysOfWeek(tourContentId, weeks);
  }
}
