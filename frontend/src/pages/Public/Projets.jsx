import { useEffect, useState } from "react";
import instance from "../../helpers/axios";

export default function Projets() {
  const [allMyProjects, setAllMyProjects] = useState([]);

  useEffect(() => {
    instance
      .get("/projects")
      .then((result) => {
        setAllMyProjects([...result.data].reverse());
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="projectContainer">
      <div className="project">
        {allMyProjects.map((myProjects) => (
          <div key={myProjects.index} className="projectCard">
            <h1>{myProjects.title}</h1>
            <img
              alt="aperçu du projet"
              src={`${import.meta.env.VITE_BACKEND_URL}/uploads/photos/${
                myProjects.img
              }`}
            />
            <h2> Description : </h2>
            <p>{myProjects.description} </p>

            <p>
              stack : {myProjects.techno} <br /> statut : {myProjects.status}{" "}
            </p>
            <a
              className="link"
              target="_blank"
              rel="noreferrer"
              href="www.lanaduval.com"
            >
              {" "}
              à rajouter en bdd{" "}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
