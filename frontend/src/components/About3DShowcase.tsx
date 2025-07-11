import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Box3, Vector3, PerspectiveCamera } from "three";

function WizardTable() {
  const group = useRef<Group>(null);
  const table = useGLTF("/wizard_table.glb");
  const { camera } = useThree();

  useEffect(() => {
    if (table && table.scene) {
      // Auto-center and scale the model
      const box = new Box3().setFromObject(table.scene);
      const size = new Vector3();
      box.getSize(size);
      const center = new Vector3();
      box.getCenter(center);
      table.scene.position.sub(center);
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 1.2 / maxDim;
      table.scene.scale.setScalar(scale);

      // Auto-fit camera
      const perspCam = camera as PerspectiveCamera;
      const fov = perspCam.fov * (Math.PI / 180);
      const modelHeight = size.y * scale;
      const modelWidth = size.x * scale;
      const aspect = perspCam.aspect;
      const fitHeightDistance = modelHeight / (2 * Math.tan(fov / 2));
      const fitWidthDistance = modelWidth / (2 * Math.tan(fov / 2)) / aspect;
      const distance = Math.max(fitHeightDistance, fitWidthDistance) + 0.5;
      const margin = 2.2; // 70% extra space
      // Set camera to a 3/4 angle (front-right, slightly above)
      const angle = Math.PI / 4; // 45 degrees
      const camX = Math.cos(angle) * distance * margin;
      const camZ = Math.sin(angle) * distance * margin;
      const camY = distance * margin * 0.4; // slightly above
      perspCam.position.set(camX, camY, camZ);
      perspCam.lookAt(0, 0, 0);
      perspCam.updateProjectionMatrix();
    }
  }, [table, camera]);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.18;
      group.current.position.y = Math.sin(clock.getElapsedTime() * 1.1) * 0.08;
    }
  });
  return (
    <group ref={group} position={[0, 0.3, 0]}>
      {/* Table: auto-centered and scaled, shifted up */}
      <primitive object={table.scene} />
    </group>
  );
}

export default function About3DShowcase() {
  return (
    <div className="w-full max-w-[500px] aspect-square min-h-[320px] mx-auto">
      <Canvas camera={{ position: [0, 1.1, 2.2], fov: 32 }} shadows>
        <ambientLight intensity={1.0} />
        <directionalLight position={[2, 4, 2]} intensity={0.8} castShadow />
        <spotLight
          position={[-2, 6, 2]}
          angle={0.3}
          penumbra={0.5}
          intensity={0.7}
          castShadow
        />
        <WizardTable />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 2.7}
        />
      </Canvas>
    </div>
  );
}
