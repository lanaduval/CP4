/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class PictureManager extends AbstractManager {
  constructor() {
    super({ table: "picture" });
  }

  insert(img, legende, projects_id, admin_id) {
    return this.connection.query(
      `insert into ${this.table} (img, legende, projects_id, admin_id) values (?, ?, ?, ?)`,
      [img, legende, projects_id, admin_id]
    );
  }

  update(picture) {
    return this.connection.query(
      `update ${this.table} set img = ?, legende = ?, projects_id = ?, admin_id = ? where id = ?`,
      [
        picture.img,
        picture.legende,
        picture.projects_id,
        picture.admin_id,
        picture.id,
      ]
    );
  }
}
module.exports = PictureManager;
