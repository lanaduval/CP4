/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Switch } from "@mui/material";
import instance from "../../helpers/axios";

export default function Projets() {
  const [allMyProjects, setAllMyProjects] = useState([]);
  const [status, setStatus] = useState("terminé");
  const handleChangeStatus = (e) => {
    setStatus(e.target.checked ? "en cours" : "terminé");
  };

  useEffect(() => {
    instance
      .get("/projects")
      .then((result) => {
        setAllMyProjects([...result.data].reverse());
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  console.warn(allMyProjects);

  const projectsOnline = allMyProjects.filter(
    (projectOnline) => projectOnline.online === "en ligne"
  );

  return (
    <>
      <h1
        className="instruction"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {" "}
        Projets réalisés
      </h1>
      <div className="scroll">
        <div className="projectContainer">
          <div className="project">
            {projectsOnline.map((myProjects) => (
              <div key={myProjects.id} className="projectCard">
                <h1>{myProjects.title}</h1>
                <img
                  alt="aperçu du projet"
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/photos/${
                    myProjects.img
                  }`}
                />
                <h2> Description : </h2>
                <p>{myProjects.description} </p>
                <p>{myProjects.techno}</p>
                <Switch
                  name="status"
                  color="warning"
                  onChange={handleChangeStatus}
                  checked={myProjects.status === "terminé"}
                  value={myProjects.status}
                />
                {myProjects.status}
                <a
                  className="link"
                  target="_blank"
                  rel="noreferrer"
                  href={myProjects.url}
                >
                  {" "}
                  lien{" "}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
