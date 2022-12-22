export default class ZodValidationError {
  status;
  name;
  message;
  constructor(message: { [key: string]: string }) {
    this.message = message;
    this.name = "Zod Validation Error";
    this.status = 403;
  }
}
