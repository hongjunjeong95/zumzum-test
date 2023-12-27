export class ServerException extends Error {
  constructor(public code: number, message: string) {
    super(message);
  }
}

export class SellerExistsException extends ServerException {
  constructor(message: string = '이미 존재하는 판매자입니다.') {
    super(409, message);
  }
}

export class UserExistsException extends ServerException {
  constructor(message: string = '이미 존재하는 유저입니다.') {
    super(409, message);
  }
}

export class PasswordNotMatchException extends ServerException {
  constructor(message: string = '패스워드가 일치하지 않습니다.') {
    super(400, message);
  }
}

export class UserNotFoundException extends ServerException {
  constructor(message: string = '유저가 존재하지 않습니다.') {
    super(404, message);
  }
}

export class PasswordNotMatchedException extends ServerException {
  constructor(message: string = '패스워드가 잘못되었습니다.') {
    super(400, message);
  }
}

export class InvalidJwtTokenException extends ServerException {
  constructor(message: string = '잘못된 토큰입니다.') {
    super(400, message);
  }
}

export class BadRequestException extends ServerException {
  constructor(message: string = '잘못된 요청입니다.') {
    super(400, message);
  }
}
