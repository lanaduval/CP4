/* eslint-disable camelcase */
import { useRef, useState } from "react";
import instance from "../helpers/axios";

export default function PhotoForm() {
  const inputRef = useRef(null);

  // const admin_id = from payload faire un context auth */
  // name du forme à mettre en BDD dans picture.img = inputRef.current.files[0].name
  const [legende, setLegende] = useState("");
  const handleChangeLegende = (e) => {
    setLegende(e.target.value);
  };

  const handleSubmitImg = (e) => {
    e.preventDefault();
    const projects_id = 1; // plus tard ça sera useParams();
    const admin_id = 1; // plus tard ça sera useParams();
    const formData = new FormData();
    const img = inputRef.current.files[0].name;
    formData.append("photos", inputRef.current.files[0]);

    instance.post("./projects-picture", formData);
    instance.post("./pictures", { img, legende, projects_id, admin_id });
    console.warn({ img, legende, projects_id, admin_id });
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmitImg}>
      <label>
        {" "}
        Ajouter une image supplémentaire ?
        <input type="file" name="photos" ref={inputRef} />
      </label>
      <label>
        {" "}
        Ajouter une légende à cette image ?
        <input type="text" name="legende" onChange={handleChangeLegende} />
      </label>
      <button type="submit">Envoyer</button>
    </form>
  );
}
