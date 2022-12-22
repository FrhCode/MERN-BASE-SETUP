export default class AuthError extends Error {
  status;
  constructor(message = "Auth is requred") {
    super(message);
    this.message = message;
    this.name = "Auth Error";
    this.status = 401;
  }
}
