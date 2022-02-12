import User from "./User.js";

export default class UserList {
  constructor() {
    this.users = [];
  }

  addUser(userObj) {
    this.users.push(new User(userObj));
  }

  updateUser(userId, userObj) {
    const user = this.findById(userId);
    user.firstname = userObj.firstname;
    user.lastname = userObj.lastname;
    user.username = userObj.username;
    user.password = userObj.password;
  }

  findById(userId) {
    // testing purposes ONLY!
    if (userId === -1) {
      return this.users[0];
    }
    return this.users.find((user) => user.id === userId);
  }

  findByUsername(username) {
    return this.users.find((user) => user.username === username);
  }
}
