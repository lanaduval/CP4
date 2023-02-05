const AbstractManager = require("./AbstractManager");

class ProjectManager extends AbstractManager {
  constructor() {
    super({ table: "projects" });
  }

  insert(projects, img) {
    return this.connection.query(
      `insert into ${this.table} (title, description, techno, status, start, end, online, admin_id, url, img) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        projects.title,
        projects.description,
        projects.techno,
        projects.status,
        projects.start,
        projects.end,
        projects.online,
        projects.admin_id,
        projects.url,
        img,
      ]
    );
  }

  update(projects) {
    return this.connection.query(
      `update ${this.table} set title = ?, description = ?, techno = ?, status = ?, start = ?,  end = ?,  online = ?, admin_id = ? where id = ?`,
      [
        projects.title,
        projects.description,
        projects.techno,
        projects.status,
        projects.start,
        projects.end,
        projects.online,
        projects.admin_id,
        projects.id,
      ]
    );
  }

  getProjectsByID(id) {
    return this.connection.query(
      ` select title, description, techno, DATE_FORMAT(start, "%Y-%m-%d") start,DATE_FORMAT(end, "%Y-%m-%d") end, status, online, img  from  ${this.table} where id= ?`,
      [id]
    );
  }

  getProjectsAndPicturesByProjectsID(id) {
    return this.connection.query(
      `select picture.id, projects.title, projects.description, projects.techno, projects.status, projects.start, projects.end, projects.online, projects.admin_id, picture.img, picture.legende, picture.projects_id
    from picture inner join projects on projects_id = projects.id where projects.id = ?`,
      [id]
    );
  }

  getAllProjectsAndPictures() {
    return this.connection
      .query(`select picture.id, projects.title, projects.description, projects.techno, projects.status, projects.start, projects.end, projects.online, projects.admin_id, picture.img, picture.legende, picture.projects_id
    from picture inner join projects on projects_id = projects.id`);
  }

  changeProjectImg({ img, id }) {
    return this.connection.query(
      `update ${this.table} set img = ? where id = ?`,
      [img, id]
    );
  }
}
module.exports = ProjectManager;
