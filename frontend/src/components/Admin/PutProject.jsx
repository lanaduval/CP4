/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { Switch } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import AllProjects from "./AllProjects";
import instance from "../../helpers/axios";

// eslint-disable-next-line react/prop-types
export default function PutProjects({ setProjectModified, projectModified }) {
  const inputRef = useRef(null);
  const [initialProject, setInitialProject] = useState("");
  // fetch le projet en fonction de son id

  const { id } = useParams();
  useEffect(() => {
    instance
      .get(`/projects/${id}`)
      .then((result) => {
        setInitialProject(result.data);
        setProjectModified(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, projectModified]);

  const [isCheckedStatus, setIsCheckedStatus] = useState(
    initialProject.status === "terminé"
  );
  const [status, setStatus] = useState(initialProject.status);
  const handleChangeStatus = (e) => {
    setStatus(e.target.checked ? "en cours" : "terminé");
    setIsCheckedStatus(!isCheckedStatus);
  };

  const [isCheckedOnline, setIsCheckedOnline] = useState(
    initialProject.online === "online"
  );
  const [online, setOnline] = useState("hors-ligne");
  const handleChangeOnline = (e) => {
    setOnline(e.target.checked ? "hors-ligne" : "en ligne");
    setIsCheckedOnline(!isCheckedOnline);
  };

  const handleChangeProjects = (e) => {
    const { name, value } = e.target;
    setInitialProject({ ...initialProject, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    instance.put(`./projects/${id}`, initialProject);
    setProjectModified(true);
  };

  const handleChangeImg = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photos", inputRef.current.files[0]);
    const img = inputRef.current.files[0].name;
    instance.post("./projects-picture", formData);
    setProjectModified(true);
    instance.put(`./projects-img/${id}`, { img });
    setProjectModified(true);
  };
  const navigate = useNavigate();
  return (
    <div className="putProject">
      <h1 className="instruction"> Modifier le projet </h1>
      <button
        type="button"
        onClick={() => navigate("/admin")}
        className="standard"
      >
        {" "}
        retour à l'admin{" "}
      </button>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <label>
          {" "}
          Titre
          <input
            type="text"
            name="title"
            placeholder="Titre"
            onChange={handleChangeProjects}
            value={initialProject.title}
          />
        </label>
        <label>
          {" "}
          Description
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChangeProjects}
            value={initialProject.description}
          />
        </label>
        <label>
          {" "}
          Stack technique
          <input
            type="text"
            name="techno"
            placeholder="Stack Technique"
            onChange={handleChangeProjects}
            value={initialProject.techno}
          />
        </label>
        <label>
          {" "}
          Date de début
          <input
            type="date"
            name="start"
            placeholder="date de début"
            onChange={handleChangeProjects}
            value={initialProject.start}
          />
        </label>
        <label>
          {" "}
          Date de fin
          <input
            type="date"
            name="end"
            placeholder="Date de fin"
            onChange={handleChangeProjects}
            value={initialProject.end}
          />
        </label>
        <label>
          <input
            type="checkbox"
            name="status"
            checked={isCheckedStatus}
            onChange={handleChangeStatus}
            onClick={handleChangeProjects}
            value={status}
          />
          Statut ? {isCheckedStatus ? "terminé" : "en cours"}
        </label>
        <label>
          <input
            type="checkbox"
            name="online"
            checked={isCheckedOnline}
            onClick={handleChangeProjects}
            onChange={handleChangeOnline}
            value={online}
          />
          Publié ? {isCheckedOnline ? " En ligne" : "Hors-ligne"}
        </label>
        <button className="modifier" type="submit">
          Modifier le projet
        </button>
        <div className="putImg">
          <img
            alt=" représentation actuelle du projet"
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/photos/${
              initialProject.img
            }`}
          />
        </div>
        <label>
          {" "}
          <h1 style={{ color: "#3e548c" }} className="instruction">
            Changer l'image ?
          </h1>
          <input type="file" name="photos" ref={inputRef} />
        </label>
        <button className="modifier" type="button" onClick={handleChangeImg}>
          {" "}
          Modifier l'image{" "}
        </button>
      </form>
    </div>
  );
}
