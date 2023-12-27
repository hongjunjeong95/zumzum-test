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
  constructor(message: string = '토큰을 이미 사용하셨습니다.') {
    super(400, message);
  }
}
