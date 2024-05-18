export class ApiResponse {
  success: boolean = false;
  data?: Object;
  error?: Object;

  constructor(success: boolean, data?: any, error?: any) {
    this.success = success;
    this.data = data;
    this.error = error;
  }
}
