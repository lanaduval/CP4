import SceneBas from "../../components/Public/3D/SceneBas";
import SceneHaut from "../../components/Public/3D/SceneHaut";
import NasaPicture from "../../components/Public/NasaPicture";
import Welcome from "../../components/Public/Welcome";

export default function Home() {
  return (
    <div>
      <Welcome />
      <NasaPicture />
      <SceneHaut className="sceneHaut" />
      <SceneBas className="sceneBas" />
    </div>
  );
}
