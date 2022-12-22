export default class CredentialError extends Error {
  status;
  constructor(message = "username atau password salah") {
    super(message);
    this.message = message;
    this.name = "Credential Error";
    this.status = 401;
  }
}
