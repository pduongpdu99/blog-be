export class HttpResponse {
  message: string | string[];
  status: number;
  data: any;
  success: boolean = false;
  version: string = '1.0.0';

  constructor(
    message: string | string[],
    status: number,
    data?: any,
    success: boolean = false,
    version: string = '1.0.0',
  ) {
    this.message = message;
    this.data = data;
    this.version = version;
    this.status = status;
    this.success = success;

    if (200 <= status && status < 300) this.success = true;
  }
}
