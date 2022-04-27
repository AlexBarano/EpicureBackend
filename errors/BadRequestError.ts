export default class BadRequestError extends Error {
  constructor(message = "Bad Request, please provide valid request") {
    super(message);
    this.name = message;
  }
}
