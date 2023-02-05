import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import SphereHaut from "./SphereHaut";

export default function SceneHaut() {
  return (
    <div>
      <Canvas className="sceneHaut">
        <Stars
          radius={70}
          depth={90}
          count={1200}
          factor={5}
          saturation={30}
          fade
          speed={2}
        />
        <ambientLight intensity={0.2} />
        <directionalLight position={[-300, -100, 100]} intensity={0.2} />
        <SphereHaut />

        <pointLight position={[180, 20, -60]} />
      </Canvas>
    </div>
  );
}
