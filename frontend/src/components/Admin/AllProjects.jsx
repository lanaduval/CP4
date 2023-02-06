/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Switch } from "@mui/material";
import { Link } from "react-router-dom";
import PostProjects from "@components/Admin/PostProject";
import instance from "../../helpers/axios";

// eslint-disable-next-line react/prop-types
export default function AllProjects() {
  const [deletedProject, setDeletedProject] = useState(false);
  const [projectPosted, setProjectPosted] = useState(false);
  const [projectModified, setProjectModified] = useState(false);
  const [allProjects, setAllProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postButton, setPostButton] = useState(false);
  const handleModal = () => {
    setShowModal(!showModal);
    setPostButton(!postButton);
  };

  useEffect(
    () => {
      instance
        .get("/projects")
        .then((result) => {
          setAllProjects([...result.data].reverse());
          setDeletedProject(false);
          setProjectPosted(false);
          setProjectModified(false);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [deletedProject, projectPosted],
    projectModified
  );

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
    <div className="projectContainerAdmin">
      <h1 className="instructionAdmin"> Administration de mes projets :</h1>
      <div className="projectAdmin">
        <button type="button" className="post" onClick={handleModal}>
          {" "}
          {postButton ? "Go Back" : "Poster un Projet"}{" "}
        </button>
        {showModal && (
          <PostProjects
            projectPosted={projectPosted}
            setProjectPosted={setProjectPosted}
          />
        )}
        {allProjects.map((myProject) => (
          <div
            key={myProject.id}
            className="projectCardAdmin"
            style={{ background: "#D5DBE3FF" }}
          >
            <h1>Titre : {myProject.title}</h1>
            <img
              alt="aperçu du projet"
              src={`${import.meta.env.VITE_BACKEND_URL}/uploads/photos/${
                myProject.img
              }`}
            />
            <h2> Description :</h2>
            <p> {myProject.description}</p>
            <h2> Stack :</h2>
            <p> {myProject.techno}</p>
            <a
              style={{ color: "black" }}
              className="link"
              target="_blank"
              rel="noreferrer"
              href={myProject.url}
            >
              {" "}
              Site{" "}
            </a>
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
              <button className="modifier" type="button">
                {" "}
                modifier
              </button>
            </Link>
            <button
              type="button"
              className="supprimer"
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
