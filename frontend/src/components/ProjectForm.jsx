import { useState } from "react";
import { Switch } from "@mui/material";
import instance from "../helpers/axios";
import "../Style.css";

export default function ProjectFrom() {
  const [status, setStatus] = useState("en cours");
  const handleChangeStatus = (e) => {
    setStatus(e.target.checked ? "terminé" : "en cours");
  };
  const [online, setOnline] = useState("hors-ligne");
  const handleChangeOnline = (e) => {
    setOnline(e.target.checked ? "en ligne" : "hors-ligne");
  };
  const [project, setProject] = useState([]);

  const handleChangeProject = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    instance.post("./projects", project);
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
            onChange={handleChangeProject}
          />
        </label>
        <label>
          {" "}
          Description
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChangeProject}
          />
        </label>
        <label>
          {" "}
          Stack technique
          <input
            type="text"
            name="techno"
            placeholder="Stack Technique"
            onChange={handleChangeProject}
          />
        </label>
        <label>
          {" "}
          Date de début
          <input
            type="date"
            name="start"
            placeholder="date de début"
            onChange={handleChangeProject}
          />
        </label>
        <label>
          {" "}
          Date de fin
          <input
            type="date"
            name="end"
            placeholder="Date de fin"
            onChange={handleChangeProject}
          />
        </label>
        <label>
          Statut
          <Switch
            name="status"
            onClick={handleChangeProject}
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
            onClick={handleChangeProject}
            onChange={handleChangeOnline}
            checked={online === "en ligne"}
            value={online}
          />
          {online === "en ligne" ? "En ligne" : "Hors-ligne"}
        </label>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
