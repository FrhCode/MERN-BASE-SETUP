export default class PrismaConstrainError {
  status;
  name;
  message;
  constructor(message: { [key: string]: string }) {
    this.message = message;
    this.name = "Constrain Error";
    this.status = 403;
  }
}
