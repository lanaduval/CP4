import axios from "axios";
import { useEffect, useState } from "react";

export default function NasaPicture() {
  const API_NASA_KEY = import.meta.env.VITE_YOUR_NASA_API_KEY;
  const API_NASA = `https://api.nasa.gov/planetary/apod?api_key=${API_NASA_KEY}`;
  const [nasa, setNasa] = useState([]);

  useEffect(() => {
    axios
      .get(API_NASA)
      .then((res) => {
        setNasa(res.data);
      })
      .catch((err) => console.error(err));
  }, [API_NASA]);

  return (
    <div>
      <img
        className="nasaAPOD"
        src={nasa.url}
        alt="Astronomic Photography Of the Day"
      />
    </div>
  );
}
