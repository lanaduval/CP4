import { useState, useRef } from "react";
import { Switch } from "@mui/material";
import instance from "../helpers/axios";
import "../Style.css";

export default function ProjectFrom() {
  const inputRef = useRef(null);
  const [status, setStatus] = useState("en cours");
  const handleChangeStatus = (e) => {
    setStatus(e.target.checked ? "terminé" : "en cours");
  };
  const [online, setOnline] = useState("hors-ligne");
  const handleChangeOnline = (e) => {
    setOnline(e.target.checked ? "en ligne" : "hors-ligne");
  };
  const [projects, setProjects] = useState([]);

  const handleChangeProjects = (e) => {
    const { name, value } = e.target;
    setProjects({ ...projects, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const img = inputRef.current.files[0].name;
    formData.append("photos", inputRef.current.files[0]);
    instance.post("./projects", { projects, img });
    instance.post("./projects-picture", formData);
  };

  return (
    <div>
      <h1> Enregistrer un nouveau projet </h1>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <label>
          {" "}
          Titre
          <input
            type="text"
            name="title"
            placeholder="Titre"
            onChange={handleChangeProjects}
          />
        </label>
        <label>
          {" "}
          Description
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChangeProjects}
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
          />
        </label>
        <label>
          Statut
          <Switch
            name="status"
            onClick={handleChangeProjects}
            onChange={handleChangeStatus}
            checked={status === "terminé"}
            value={status}
          />
          {status === "terminé" ? "Terminé" : "En Cours"}
        </label>
        <label>
          Statut
          <Switch
            name="online"
            onClick={handleChangeProjects}
            onChange={handleChangeOnline}
            checked={online === "en ligne"}
            value={online}
          />
          {online === "en ligne" ? "En ligne" : "Hors-ligne"}
        </label>
        <label>
          {" "}
          Ajouter une image
          <input type="file" name="photos" ref={inputRef} />
        </label>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
