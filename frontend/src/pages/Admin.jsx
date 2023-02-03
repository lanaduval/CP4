import { useState } from "react";
import PostProjects from "@components/PostProject";
import AllProjects from "@components/AllProjects";

export default function Admin() {
  const [projectPosted, setProjectPosted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postButton, setPostButton] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
    setPostButton(!postButton);
  };
  return (
    <div>
      <button type="button" onClick={handleModal}>
        {" "}
        {postButton ? "Go Back" : "Poster un Projet"}{" "}
      </button>
      {showModal && (
        <PostProjects
          projectPosted={projectPosted}
          setProjectPosted={setProjectPosted}
        />
      )}
      <AllProjects
        setProjectPosted={setProjectPosted}
        projectPosted={projectPosted}
      />
    </div>
  );
}
