export default class UserAuthFail extends Error {
  constructor(message = "User Authentication Failed") {
    super(message);
    this.name = message;
  }
}
