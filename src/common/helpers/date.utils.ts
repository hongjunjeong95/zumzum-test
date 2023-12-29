import { WeekEnum } from '@domain/tour/persistence/tour.entity';
import { InternalServerErrorException } from '@nestjs/common';

export class DateUtils {
  static generateDateArray(
    localeStartDateString: string,
    localeEndDateString: string,
  ): string[] {
    const addDays = (date: Date, days: number): Date => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    };

    const iterateDates = (
      currentDate: Date,
      endDate: Date,
      dates: string[],
    ): string[] => {
      return currentDate <= endDate
        ? iterateDates(addDays(currentDate, 1), endDate, [
            ...dates,
            currentDate.toLocaleDateString(),
          ])
        : dates;
    };

    const startDate = new Date(localeStartDateString);
    const endDate = new Date(localeEndDateString);

    return iterateDates(startDate, endDate, []);
  }

  static getWeek(localeDateString: string): WeekEnum {
    const weekNum = new Date(localeDateString).getDay();
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

  static getDaysUntilDate(date: Date) {
    const tourDate = new Date(date);
    const millisecondsInOneDay = 24 * 60 * 60 * 1000; // 1일의 밀리초
    return Math.floor(
      (tourDate.getTime() - new Date().getTime()) / millisecondsInOneDay,
    );
  }

  static getMonthDiff(date1: Date, date2: Date) {
    return (
      date2.getMonth() -
      date1.getMonth() +
      12 * (date2.getFullYear() - date1.getFullYear())
    );
  }
}
