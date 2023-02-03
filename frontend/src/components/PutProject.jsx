import { useState, useRef, useEffect } from "react";
import { Switch } from "@mui/material";
import { useParams } from "react-router-dom";
import instance from "../helpers/axios";

// eslint-disable-next-line react/prop-types
export default function PutProjects({ projectPosted, setProjectPosted }) {
  const inputRef = useRef(null);
  const [initialProject, setInitialProject] = useState("");
  // fetch le projet en fonction de son id
  const { id } = useParams();
  useEffect(() => {
    instance
      .get(`/projects/${id}`)
      .then((result) => {
        setInitialProject(result.data);
        setProjectPosted(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [projectPosted, id]);

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
    const formData = new FormData();
    // eslint-disable-next-line no-lone-blocks
    {
      /*  const img = inputRef.current.files[0].name
      ? inputRef.current.files[0].name
      : initialProject.img;
  formData.append("photos", inputRef.current.files[0]); */
    }
    instance.put(`./projects/${id}`, initialProject);
    setProjectPosted(true);
    if (formData) {
      instance.post("./projects-picture", formData);
      setProjectPosted(true);
    } else {
      console.warn("coucou");
    }
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
        <label>
          {" "}
          Changer l'image ?
          <input type="file" name="photos" ref={inputRef} />
        </label>
        <button type="submit">Modifier</button>
        <img
          alt=" représentation actuelle du projet"
          src={`${import.meta.env.VITE_BACKEND_URL}/uploads/photos/${
            initialProject.img
          }`}
        />
      </form>
    </div>
  );
}
