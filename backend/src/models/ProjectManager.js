const AbstractManager = require("./AbstractManager");

class ProjectManager extends AbstractManager {
  constructor() {
    super({ table: "projects" });
  }

  insert(projects) {
    return this.connection.query(
      `insert into ${this.table} (title, description, techno, status, start, end, online, admin_id) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        projects.title,
        projects.description,
        projects.techno,
        projects.status,
        projects.start,
        projects.end,
        projects.online,
        projects.admin_id,
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
}
module.exports = ProjectManager;
