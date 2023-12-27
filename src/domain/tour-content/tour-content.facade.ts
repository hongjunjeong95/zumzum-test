import { Injectable } from '@nestjs/common';

import { TourContentService } from './service/tour-content.service';
import { TourContent } from './persistence/tour-content.entity';
import { CreateTourContentBodyDto } from './dtos/create.dto';

@Injectable()
export class TourContentFacade {
  constructor(private readonly tourContentService: TourContentService) {}

  public async create(
    sellerId: number,
    body: CreateTourContentBodyDto,
  ): Promise<void> {
    await this.tourContentService.save(
      TourContent.create({
        content: body.content,
        sellerId,
      }),
    );
  }
}
