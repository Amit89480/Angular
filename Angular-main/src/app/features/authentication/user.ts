export class User {
  constructor(
      public email: string,
      private id: string,
      public dbUserId: string,
      private _token: string,
      private type: string,
      private _tokenExpirationDate: Date
  ) {}

  getToken() {
      if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
          return null;
      }
      return this._token;
  }
}
