import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Ocean from "./Ocean";
import SphereBas from "./SphereBas";

export default function SceneBas() {
  return (
    <div className="sceneBas">
      <Canvas>
        <Stars
          className="stars"
          radius={40}
          depth={70}
          count={9000}
          factor={4}
          saturation={50}
          fade
          speed={2}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-7, 1, -5]} intensity={0.9} />
        <SphereBas />
        <Ocean />
        <pointLight position={[6, 3, 5]} />
      </Canvas>
    </div>
  );
}
