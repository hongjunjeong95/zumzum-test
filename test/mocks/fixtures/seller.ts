import { Reservation } from '@domain/reservation/persistence/reservation.entity';
import { Seller } from '@domain/seller/persistence/seller.entity';
import { TourContent } from '@domain/tour-content/persistence/tour-content.entity';
import { Tour, WeekEnum } from '@domain/tour/persistence/tour.entity';
import { BCryptUtils } from '@helpers/bcrypt.utils';

export const getMockSeller = async () => {
  const seller = new Seller();
  seller.id = 1;
  seller.createdAt = new Date();
  seller.updatedAt = new Date();
  seller.name = 'seller-name';
  seller.email = 'seller@gmail.com';
  seller.password = await BCryptUtils.encrypt('password12345678');
  return seller;
};

export const getMockTour = () => {
  const tour = new Tour();
  tour.id = 1;
  tour.createdAt = new Date();
  tour.updatedAt = new Date();
  tour.isHoliday = false;
  tour.maxReservation = 5;
  tour.date = new Date(new Date().setDate(new Date().getDate() + 10));
  tour.localeDateString = '2023/11/27';
  tour.timezoneOffset = -540;
  tour.week = WeekEnum.SUNDAY;
  return tour;
};

export const getMockReservation = () => {
  const reservation = new Reservation();
  reservation.id = 1;
  reservation.createdAt = new Date();
  reservation.updatedAt = new Date();
  reservation.token = 'fjwlkjfslkdfjasiofji23123';
  reservation.isTokenUsed = false;
  reservation.isCancelled = false;
  reservation.tourId = 1;
  reservation.customerId = 1;
  return reservation;
};

export const getMockTourContent = () => {
  const tourContent = new TourContent();
  tourContent.id = 1;
  tourContent.createdAt = new Date();
  tourContent.updatedAt = new Date();
  tourContent.content = 'hello its content';
  tourContent.holidaysOfWeek = null;
  tourContent.sellerId = 1;
  return tourContent;
};
