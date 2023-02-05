export default function StarsSky() {
  return (
    <div className="stars">
      <ambientLight intensity={0.2} />
      <directionalLight position={[-300, -100, 100]} intensity={0.2} />
      <pointLight position={[180, 20, -60]} />
    </div>
  );
}
