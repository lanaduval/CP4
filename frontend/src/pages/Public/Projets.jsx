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

  return (
    <div className="scroll">
      <div className="projectContainer">
        <div className="project">
          {allMyProjects.map((myProjects) => (
            <div key={myProjects.index} className="projectCard">
              <h1>{myProjects.title}</h1>
              <img
                alt="aperçu du projet"
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/photos/${
                  myProjects.img
                }`}
              />
              <h2> Description : </h2>
              <p>{myProjects.description} </p>

              <p>
                stack : {myProjects.techno} <br /> statut : {myProjects.status}{" "}
              </p>
              <a
                className="link"
                target="_blank"
                rel="noreferrer"
                href={myProjects.url}
              >
                {" "}
                lien{" "}
              </a>
              <Switch
                name="status"
                color="warning"
                onChange={handleChangeStatus}
                checked={myProjects.status === "terminé"}
                value={myProjects.status}
              />
              {myProjects.status}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
