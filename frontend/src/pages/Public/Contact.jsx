import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Socials from "@components/Socials";
import "./Anims.scss";

export default function Contact() {
  const form = useRef();
  const notify = () => {
    toast.dark(" Message envoyé ! ✅ ");
  };

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_YOUR_SERVICE_ID,
        import.meta.env.VITE_YOUR_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_YOUR_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.warn(result.text);
          if (name !== "" && message !== "") {
            notify();
          } else {
            toast.error("Formulaire vide ! ❌");
          }
        },
        (error) => {
          console.warn(error.text);
        }
      );
  };

  return (
    <div>
      <div className="contactForm">
        <h1>
          Pour collaborer, <br /> envoyez-moi un message ici :
        </h1>

        <ToastContainer
          theme="dark"
          autoClose={2000}
          position="bottom-center"
          className="toast-container"
          toastClassName="dark-toast"
        />

        <form className="contactFormLabel" ref={form} onSubmit={sendEmail}>
          <label>
            Nom
            <input
              placeholder="Votre Nom Prénom"
              type="text"
              name="user_name"
              onChange={handleNameChange}
            />
          </label>
          <label>
            Email
            <input placeholder="votre@mail" type="email" name="user_email" />
          </label>
          <label>
            Message
            <textarea
              placeholder="Votre message"
              name="message"
              onChange={handleMessageChange}
            />
          </label>
          <input id="sendButton" type="submit" value="Send" />
        </form>
      </div>
      <Socials />
    </div>
  );
}
