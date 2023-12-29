export class BaseException extends Error {
  constructor(public code: number, message: string) {
    super(message);
  }
}

export class UserExistsException extends BaseException {
  constructor(message: string = '이미 존재하는 유저입니다.') {
    super(409, message);
  }
}

export class PasswordNotMatchException extends BaseException {
  constructor(message: string = '패스워드가 일치하지 않습니다.') {
    super(400, message);
  }
}

export class UserNotFoundException extends BaseException {
  constructor(message: string = '유저가 존재하지 않습니다.') {
    super(404, message);
  }
}

export class AlreadyTokenUsedException extends BaseException {
  constructor(message: string = '예약 토큰을 이미 사용하셨습니다.') {
    super(400, message);
  }
}

export class LateCancelReservationException extends BaseException {
  constructor(
    message: string = '예약 취소는 투어 시작 3일 전까지만 가능합니다.',
  ) {
    super(400, message);
  }
}

export class HolidayReservationException extends BaseException {
  constructor(message: string = '휴일에 예약을 하실 수 없습니다.') {
    super(400, message);
  }
}

export class TooManyDatesToCreateException extends BaseException {
  constructor(message: string = '너무 많은 tour를 생성하려고 합니다.') {
    super(400, message);
  }
}
