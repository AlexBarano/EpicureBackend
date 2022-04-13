export default class DatabaseActionFail extends Error {
  constructor(message) {
    super(message);
    this.name = "Database Error, didn't finish action";
  }
}
