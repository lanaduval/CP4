const AbstractManager = require("./AbstractManager");

class AdminManager extends AbstractManager {
  constructor() {
    super({ table: "admin" });
  }

  insert(admin) {
    return this.connection.query(
      `insert into ${this.table} (firstname, lastname, email, pwd, img) values (?, ? , ? , ?, ?)`,
      [
        admin.firstname,
        admin.lastname,
        admin.email,
        admin.hashedPassword,
        admin.img,
      ]
    );
  }

  update(admin) {
    return this.connection.query(
      `update ${this.table} set firstname = ?, lastname= ?, email = ?, pwd = ?, img = ? where id = ?`,
      [
        admin.firstname,
        admin.lastname,
        admin.email,
        admin.hashedPassword,
        admin.img,
        admin.id,
      ]
    );
  }

  findByEmail(email) {
    return this.connection.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
  }
}
module.exports = AdminManager;
