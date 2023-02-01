import { useRef } from "react";
import instance from "../helpers/axios";

export default function fileUpload() {
  const inputRef = useRef(null);
  // eslint-disable-next-line no-lone-blocks
  {
    /*  const [project, setProject] = useState("");
const [img, setImg] = useState("");  */
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", inputRef.current.files[0]);
    console.warn(formData);
    console.warn(inputRef.current.files[0].name);

    instance.post("./admin-profil", formData);
    // instance.post("./");
  };
  // faire tous le form data ici recup le nom original du fichier pour l'enregistre dans img en DB
  // recup les infos sur le project aussi.
  // name du forme à mettre en BDD dans picture.img = inputRef.current.files[0].name
  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <input type="file" name="avatar" ref={inputRef} />
      <button type="submit">Envoyer</button>
    </form>
  );
}
