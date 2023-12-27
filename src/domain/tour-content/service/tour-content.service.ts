import { Inject, Injectable, Logger } from '@nestjs/common';

import { TourContent } from '../persistence/tour-content.entity';
import {
  TourContentRepositoryInterface,
  TourContentRepositoryInterfaceToken,
} from '../persistence/repository/tour-content.repository.interface';

@Injectable()
export class TourContentService {
  constructor(
    @Inject(TourContentRepositoryInterfaceToken)
    private readonly tourContentRepository: TourContentRepositoryInterface,
  ) {}

  private readonly logger = new Logger(TourContent.name);

  async save(tourContent: TourContent): Promise<TourContent> {
    return this.tourContentRepository.customSave(tourContent);
  }
}
