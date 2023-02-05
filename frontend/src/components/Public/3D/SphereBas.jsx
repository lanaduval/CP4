import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import TextureSphere2 from "./texture/textureSphere2.jpg";

export default function SphereBas() {
  const colorMap2 = useLoader(TextureLoader, TextureSphere2);
  return (
    <mesh rotation={[25, 6, 20]}>
      <sphereGeometry attach="geometry" args={[0.6, 38, 40]} />
      {/* <meshStandardMaterial attach ="material" transparent opacity={0.5} color='#816EFC' metalness={0.5}/> */}
      <meshStandardMaterial map={colorMap2} />
    </mesh>
  );
}
