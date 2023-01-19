import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Float, OrbitControls } from '@react-three/drei';
import Shoe from './Shoe';
import { Settings, ShoeCameraAndAudio } from '../types';

interface ViewerProps {
  settings: Settings;
  initialAnimationEnded: boolean;
  disabledOrbitControls: boolean;
  onSetCamera: (cameraAndAudio: ShoeCameraAndAudio) => void;
  onAnimationEnded: (value: boolean) => void;
}

function Viewer({
  settings,
  initialAnimationEnded,
  disabledOrbitControls,
  onSetCamera,
  onAnimationEnded,
}: ViewerProps) {
  const handleShoeMounted = (cameraAndAudio: ShoeCameraAndAudio) => onSetCamera(cameraAndAudio);
  const handleAnimationEnded = (value: boolean) => onAnimationEnded(value);
  return (
    <Canvas className={!initialAnimationEnded || disabledOrbitControls ? 'canvas--disabled' : ''}>
      <color attach="background" args={[settings.outer]} />
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <Float
        speed={!disabledOrbitControls ? 1 : 0}
        rotationIntensity={1}
        floatIntensity={5}
        floatingRange={[0.025, 0.1]}
      >
        <Shoe
          position={[0, 0, 0]}
          settings={settings}
          onMounted={handleShoeMounted}
          onAnimationEnded={handleAnimationEnded}
        />
      </Float>
      <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
      <OrbitControls
        minDistance={disabledOrbitControls ? 1 : 1.5}
        maxDistance={2}
        enableRotate={initialAnimationEnded && !disabledOrbitControls}
        enableZoom={initialAnimationEnded && !disabledOrbitControls}
      />
    </Canvas>
  );
}

export default Viewer;
