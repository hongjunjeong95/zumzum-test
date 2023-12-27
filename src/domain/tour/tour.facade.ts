import { Injectable } from '@nestjs/common';

import { TourService } from './service/tour.service';
import { CreateToursBodyDto } from './dtos/create-many.dto';

@Injectable()
export class TourFacade {
  constructor(private readonly tourService: TourService) {}

  public async createMany(body: CreateToursBodyDto): Promise<any> {
    const {
      tourContentId,
      timezoneOffset,
      localeStartDateString,
      localeEndDateString,
    } = body;

    const tourEntities = this.tourService.createEntities({
      localeEndDateString,
      localeStartDateString,
      timezoneOffset,
      tourContentId,
    });

    await this.tourService.save(tourEntities);
  }
}
