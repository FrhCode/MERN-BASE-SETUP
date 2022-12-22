export default class FileNotFound extends Error {
  status;
  constructor(message = "File Not Found") {
    super(message);
    this.message = message;
    this.name = "File Not Found";
    this.status = 404;
  }
}
