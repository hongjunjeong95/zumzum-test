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

  async create(content: string, sellerId: number): Promise<TourContent> {
    return this.tourContentRepository.customSave(
      TourContent.create({
        content,
        sellerId,
      }),
    );
  }
}
