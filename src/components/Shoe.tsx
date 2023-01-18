import React, { useEffect } from 'react';
import { BufferGeometry, Object3D } from 'three';
import { Camera, GroupProps, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { gsap } from 'gsap';
import { Settings } from '../types';

interface ShoeProps extends GroupProps {
  settings: Settings;
  onMounted: (camera: Camera) => void;
}

function Shoe(props: ShoeProps) {
  const { settings, ...rest } = props;
  const model = useGLTF('./shoe-draco.glb');
  const nodes = model.nodes as { [key: string]: Object3D & { geometry: BufferGeometry } };
  const { camera } = useThree();

  useEffect(() => {
    rest.onMounted(camera);
  }, []);

  return (
    <group {...rest}>
      <mesh
        geometry={nodes.shoe.geometry}
        material={model.materials.laces}
        material-color={settings.laces}
        receiveShadow
        castShadow
      />
      <mesh
        geometry={nodes.shoe_1.geometry}
        material={model.materials.mesh}
        material-color={settings.outer}
        receiveShadow
        castShadow
      />
      <mesh
        geometry={nodes.shoe_2.geometry}
        material={model.materials.caps}
        material-color={settings.caps}
        receiveShadow
        castShadow
      />
      <mesh
        geometry={nodes.shoe_3.geometry}
        material={model.materials.inner}
        material-color={settings.inner}
        receiveShadow
        castShadow
      />
      <mesh
        geometry={nodes.shoe_4.geometry}
        material={model.materials.sole}
        material-color={settings.sole}
        receiveShadow
        castShadow
      />
      <mesh
        geometry={nodes.shoe_5.geometry}
        material={model.materials.stripes}
        material-color={settings.stripes}
        receiveShadow
        castShadow
      />
      <mesh
        geometry={nodes.shoe_6.geometry}
        material={model.materials.band}
        material-color={settings.band}
        receiveShadow
        castShadow
      />
      <mesh
        geometry={nodes.shoe_7.geometry}
        material={model.materials.patch}
        material-color={settings.patch}
        receiveShadow
        castShadow
      />
    </group>
  );
}

export default Shoe;
