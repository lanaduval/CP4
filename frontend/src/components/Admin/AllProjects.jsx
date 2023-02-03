import { useEffect, useState } from "react";
import { Switch } from "@mui/material";
import { Link } from "react-router-dom";
import instance from "../../helpers/axios";

// eslint-disable-next-line react/prop-types
export default function AllProjects({ setProjectPosted, projectPosted }) {
  const [deletedProject, setDeletedProject] = useState(false);

  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    instance
      .get("/projects")
      .then((result) => {
        setAllProjects([...result.data].reverse());
        setDeletedProject(false);
        setProjectPosted(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [deletedProject, projectPosted]);

  const handleDeleteProject = (projectId) => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    const isDelete = confirm("supprimer le projet'?");

    if (isDelete) {
      instance.delete(`/projects/${projectId}`);
      setDeletedProject(true);
    }
  };
  const [status, setStatus] = useState("terminé");
  const handleChangeStatus = (e) => {
    setStatus(e.target.checked ? "en cours" : "terminé");
  };
  const [online, setOnline] = useState("en ligne");
  const handleChangeOnline = (e) => {
    setOnline(e.target.checked ? "hors-ligne" : "en ligne");
  };

  return (
    <div className="projectContainer">
      <h1> Tous mes projets </h1>
      <div className="project">
        {allProjects.map((myProject) => (
          <div key={myProject.id} className="projectCard">
            <h1>{myProject.title}</h1>
            <img
              alt="aperçu du projet"
              src={`${import.meta.env.VITE_BACKEND_URL}/uploads/photos/${
                myProject.img
              }`}
            />
            <p> {myProject.description}</p>
            <p> {myProject.techno}</p>
            <Switch
              name="status"
              onChange={handleChangeStatus}
              checked={myProject.status === "terminé"}
              value={myProject.status}
            />
            {myProject.status}

            <Switch
              name="online"
              onChange={handleChangeOnline}
              checked={myProject.online === "en ligne"}
              value={myProject.online}
            />
            {myProject.online}
            <Link to={`/projects/${myProject.id}`}>
              <button type="button"> modifier</button>
            </Link>
            <button
              type="button"
              onClick={() => handleDeleteProject(myProject.id)}
            >
              {" "}
              supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
