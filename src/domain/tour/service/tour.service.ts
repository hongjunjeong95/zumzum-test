import { Inject, Injectable, Logger } from '@nestjs/common';

import { Tour } from '../persistence/tour.entity';
import {
  TourRepositoryInterface,
  TourRepositoryInterfaceToken,
} from '../persistence/repository/tour.repository.interface';
import { DateUtils } from '@helpers/date.utils';

@Injectable()
export class TourService {
  constructor(
    @Inject(TourRepositoryInterfaceToken)
    private readonly tourRepository: TourRepositoryInterface,
  ) {}

  private readonly logger = new Logger(Tour.name);

  save(tour: Tour): Promise<Tour>;
  save(tours: Tour[]): Promise<Tour[]>;
  async save(entity: Tour | Tour[]): Promise<Tour | Tour[]> {
    if (Array.isArray(entity)) {
      return this.tourRepository.customSave(entity);
    } else {
      return this.tourRepository.customSave(entity);
    }
  }

  createEntities(param: {
    tourContentId: number;
    timezoneOffset: number;
    localeStartDateString: string;
    localeEndDateString: string;
  }) {
    const {
      localeEndDateString,
      localeStartDateString,
      timezoneOffset,
      tourContentId,
    } = param;
    return DateUtils.getLocaleDateStringRange({
      localeStartDateString,
      localeEndDateString,
    }).map((localeDateString) =>
      Tour.create({
        localeDateString,
        tourContentId,
        timezoneOffset,
      }),
    );
  }
}
