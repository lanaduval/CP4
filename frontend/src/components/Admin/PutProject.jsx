/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { Switch } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import AllProjects from "./AllProjects";
import instance from "../../helpers/axios";

// eslint-disable-next-line react/prop-types
export default function PutProjects() {
  const inputRef = useRef(null);
  const [initialProject, setInitialProject] = useState("");
  // fetch le projet en fonction de son id
  const [projectModified, setProjectModified] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    instance
      .get(`/projects/${id}`)
      .then((result) => {
        setInitialProject(result.data);
        setProjectModified(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [projectModified, id]);

  const [status, setStatus] = useState(initialProject.status);
  const handleChangeStatus = (e) => {
    setStatus(e.target.checked ? "en cours" : "terminé");
  };

  const [online, setOnline] = useState(initialProject.online);
  const handleChangeOnline = (e) => {
    setOnline(e.target.checked ? "hors-ligne" : "en ligne");
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
    <div>
      <button
        type="button"
        onClick={() => navigate("/admin")}
        className="backButton"
      >
        {" "}
        retour à l'admin{" "}
      </button>
      <h1> Modifier le projet </h1>
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
        <Switch
          name="status"
          onChange={handleChangeStatus}
          checked={initialProject.status === "terminé"}
          value={initialProject.status}
        />
        {initialProject.status}
        <Switch
          name="online"
          onChange={handleChangeOnline}
          checked={initialProject.online === "en ligne"}
          value={initialProject.online}
        />
        {initialProject.online}
        <button type="submit">Modifier le projet</button>
        <img
          alt=" représentation actuelle du projet"
          src={`${import.meta.env.VITE_BACKEND_URL}/uploads/photos/${
            initialProject.img
          }`}
        />
        <label>
          {" "}
          Changer l'image ?
          <input type="file" name="photos" ref={inputRef} />
        </label>
        <button type="button" onClick={handleChangeImg}>
          {" "}
          Modifier l'image{" "}
        </button>
        <button type="button"> Ajouter d'autres images ?</button>
      </form>
      <AllProjects />
    </div>
  );
}
