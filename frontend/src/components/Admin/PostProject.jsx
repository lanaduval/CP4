import { useState, useRef } from "react";
import instance from "../../helpers/axios";

// eslint-disable-next-line react/prop-types
export default function PostProjects({ setProjectPosted }) {
  const inputRef = useRef(null);

  const [isChecked, setIsChecked] = useState(false);
  const [status, setStatus] = useState("terminé");
  const handleChangeStatus = (e) => {
    setStatus(e.target.checked ? "en cours" : "terminé");
    setIsChecked(!isChecked);
  };
  const [isCheckedOnline, setIsCheckedOnline] = useState(false);
  const [online, setOnline] = useState("hors-ligne");
  const handleChangeOnline = (e) => {
    setOnline(e.target.checked ? "hors-ligne" : "en ligne");
    setIsCheckedOnline(!isCheckedOnline);
  };
  const [projects, setProjects] = useState([]);

  const handleChangeProjects = (e) => {
    const { name, value } = e.target;
    setProjects({ ...projects, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photos", inputRef.current.files[0]);
    const img = inputRef.current.files[0].name;
    instance.post("./projects", { projects, img });
    instance.post("./projects-picture", formData);
    setProjectPosted(true);
  };

  return (
    <div>
      <h1 className="instruction"> Enregistrer un nouveau projet </h1>
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
          <textarea
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
          <input
            type="checkbox"
            name="status"
            checked={isChecked}
            onChange={handleChangeStatus}
            onClick={handleChangeProjects}
            value={status}
          />
          Statut ? {isChecked ? "terminé" : "en cours"}
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
        <label>
          {" "}
          Site
          <input
            type="text"
            name="url"
            placeholder="url"
            onChange={handleChangeProjects}
          />
        </label>
        <label>
          {" "}
          Ajouter une image
          <input type="file" name="photos" ref={inputRef} />
        </label>
        <button className="standard" style={{ width: "100%" }} type="submit">
          Ajouter
        </button>
      </form>
    </div>
  );
}
