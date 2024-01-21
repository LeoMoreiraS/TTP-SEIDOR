export class ApplicationError extends Error {
  status: number;
  message: string;

  constructor (message: string, status = 400) {
    super(message);
    this.message = message;
    this.status = status;
  }
}
