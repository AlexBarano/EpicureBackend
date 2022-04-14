export default class DatabaseActionFail extends Error {
  constructor(message = "Database failure") {
    super(message);
    this.name = message;
  }
}
