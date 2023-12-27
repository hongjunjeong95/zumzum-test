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
}
