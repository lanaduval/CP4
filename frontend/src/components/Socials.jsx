import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

export default function Socials() {
  return (
    <div>
      <a
        href="https://www.linkedin.com/in/lana-duval-687504136/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon
          className="fab fa-react fa-2x"
          style={{ color: "#FFF", marginInline: "1rem", paddingBlock: "1rem" }}
          icon={faLinkedin}
        />
      </a>
      <a
        href="https://github.com/lanaduval"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon
          className="fab fa-react fa-2x"
          style={{ color: "#FFF", marginInline: "1rem", paddingBlock: "1rem" }}
          icon={faGithub}
        />
      </a>
      <a
        href="https://www.instagram.com/lana.duval/?hl=fr"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon
          className="fab fa-react fa-2x"
          style={{
            color: "#FFF",
            marginInline: "1rem",
            marginTop: "0",
            paddingBlock: "1rem",
          }}
          icon={faInstagram}
        />
      </a>
    </div>
  );
}
