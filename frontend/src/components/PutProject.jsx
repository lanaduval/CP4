import { useState, useRef, useEffect } from "react";
import { Switch } from "@mui/material";
import { useParams } from "react-router-dom";
import instance from "../helpers/axios";

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

  const [status, setStatus] = useState("terminé");
  const handleChangeStatus = (e) => {
    setStatus(e.target.checked ? "en cours" : "terminé");
  };
  const [online, setOnline] = useState("hors-ligne");
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

  return (
    <div>
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
        <label>
          Statut
          <Switch
            name="status"
            onClick={handleChangeProjects}
            onChange={handleChangeStatus}
            checked={status === "en cours"}
            value={status}
          />
          {status === "terminé" ? "En cours" : "Terminé"}
        </label>
        <label>
          Publié
          <Switch
            name="online"
            onClick={handleChangeProjects}
            onChange={handleChangeOnline}
            checked={online === "hors-ligne"}
            value={online}
          />
          {online === "en ligne" ? "Hors-ligne" : "En ligne"}
        </label>
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
    </div>
  );
}
