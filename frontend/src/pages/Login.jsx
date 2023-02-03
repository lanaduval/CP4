import { useState } from "react";
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import instance from "../helpers/axios";

export default function Admin() {
  const [admin, setAdmin] = useState();
  const navigate = useNavigate();

  const handleAdmin = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      instance
        .post("/login", admin)
        .then((res) => {
          const { token } = res.data;
          const user = jwtDecode(token);
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          if (!user) {
            toast.warn("Attention vous n'avez pas les droits ! ❌");
          } else {
            navigate("/admin");
          }
        })
        .catch((err) => console.error(err));
    }
  };
  return (
    <div className="formContainer">
      <ToastContainer
        theme="colored"
        type="warning"
        autoClose={2000}
        position="bottom-right"
        className="toast-container"
        toastClassName="dark-toast"
      />
      <form>
        <label>
          Email
          <input
            name="email"
            placeholder="votre@mail.com"
            onChange={handleAdmin}
          />
        </label>
        <label>
          Password
          <input
            name="pwd"
            type="password"
            placeholder="mot de passe"
            onChange={handleAdmin}
            onKeyDown={handleKeyDown}
          />
        </label>
      </form>
    </div>
  );
}
