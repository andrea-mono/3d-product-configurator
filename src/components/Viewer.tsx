import React, { useState } from 'react';
import { Camera, Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Float, OrbitControls } from '@react-three/drei';
import Shoe from './Shoe';
import { Settings } from '../types';

interface ViewerProps {
  settings: Settings;
  disabledOrbitControls: boolean;
  onSetCamera: (camera: Camera) => void;
}

function Viewer({ settings, disabledOrbitControls, onSetCamera }: ViewerProps) {
  const handleShoeMounted = (camera: Camera) => onSetCamera(camera);
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <Float
        speed={!disabledOrbitControls ? 0 : 0}
        rotationIntensity={1}
        floatIntensity={5}
        floatingRange={[0.025, 0.1]}
      >
        <Shoe rotation={[0, 0, -0.5]} position={[0, 0, 0]} settings={settings} onMounted={handleShoeMounted} />
      </Float>
      <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
      <OrbitControls
        minDistance={disabledOrbitControls ? 1 : 1.2}
        maxDistance={2}
        enableRotate={!disabledOrbitControls}
        enableZoom={true}
      />
    </Canvas>
  );
}

export default Viewer;
