export default class User {
  constructor(userObj) {
    this.id = Math.round(Math.random() * 1000000).toString();
    this.firstname = userObj.firstname;
    this.lastname = userObj.lastname;
    this.username = userObj.username;
    this.password = userObj.password;
  }
}
