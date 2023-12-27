export enum ApiStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export class ApiResponse<Data> {
  constructor(
    public status: ApiStatus,
    public message: string | null,
    public data: Data | null,
  ) {}

  static success<Data>(data: Data | null): ApiResponse<Data> {
    return new ApiResponse(ApiStatus.SUCCESS, null, data);
  }

  static error<Data>(message: string | null): ApiResponse<Data> {
    return new ApiResponse(ApiStatus.ERROR, message, null);
  }
}
