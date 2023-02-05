import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import galacticTexture from "./texture/texture_galactic.jpg";

export default function SphereHaut() {
  const colorMap = useLoader(TextureLoader, galacticTexture);
  return (
    <mesh rotation={[25, 6, 20]}>
      <sphereGeometry attach="geometry" args={[0.7, 30, 30]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}
