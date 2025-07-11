import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

function HatModel() {
  const group = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.4;
      group.current.position.y = Math.sin(clock.getElapsedTime() * 1.2) * 0.12;
    }
  });
  return (
    <group ref={group}>
      {/* Hat Brim */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.55, 0.13, 32, 64]} />
        <meshStandardMaterial color="#23243a" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Hat Cone */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <coneGeometry args={[0.45, 1.2, 32]} />
        <meshStandardMaterial
          color="#6366f1"
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>
      {/* Magic Orb */}
      <mesh position={[0.25, 0.7, 0.18]} castShadow>
        <sphereGeometry args={[0.13, 32, 32]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* Hat Band */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <torusGeometry args={[0.28, 0.06, 16, 32]} />
        <meshStandardMaterial color="#f472b6" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function WizardHat3D() {
  return (
    <div
      style={{ width: "100%", height: "100%", minHeight: 320, minWidth: 320 }}
    >
      <Canvas camera={{ position: [2, 1.2, 2.5], fov: 38 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 2]} intensity={0.7} castShadow />
        <spotLight
          position={[-2, 6, 2]}
          angle={0.3}
          penumbra={0.5}
          intensity={0.5}
          castShadow
        />
        <HatModel />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 2.7}
        />
      </Canvas>
    </div>
  );
}
