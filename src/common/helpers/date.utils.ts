import { WeekEnum } from '@domain/holiday-of-week/persistence/holiday-of-week.entity';
import { InternalServerErrorException } from '@nestjs/common';
import dayjs from 'dayjs';

export class DateUtils {
  static getLocaleDateStringRange(range: {
    localeStartDateString: string;
    localeEndDateString: string;
  }) {
    const { localeEndDateString, localeStartDateString } = range;
    return Array.from(
      {
        length:
          dayjs(localeEndDateString).diff(localeStartDateString, 'day') + 1,
      },
      (_, index) => {
        return dayjs(localeStartDateString)
          .add(index, 'day')
          .format('YYYY-MM-DD');
      },
    );
  }

  static getWeek(localeDateString: string): WeekEnum {
    const weekNum = dayjs(localeDateString).day();
    switch (weekNum) {
      case 0:
        return WeekEnum.SUNDAY;
      case 1:
        return WeekEnum.MONDAY;
      case 2:
        return WeekEnum.TUESDAY;
      case 3:
        return WeekEnum.WEDNESDAY;
      case 4:
        return WeekEnum.THURSDAY;
      case 5:
        return WeekEnum.FRIDAY;
      case 6:
        return WeekEnum.SATURDAY;
      default:
        throw new InternalServerErrorException(
          '변환해야 할 week case가 존재하지 않습니다.',
        );
    }
  }

  static addDateToLocaleDateString(date: number, localeDateString: string) {
    return new Date(
      new Date(localeDateString).setDate(
        new Date(localeDateString).getDate() + date,
      ),
    ).toLocaleDateString();
  }
}
