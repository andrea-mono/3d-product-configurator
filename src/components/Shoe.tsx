import React, { useEffect, useRef } from 'react';
import { BufferGeometry, Group, Object3D } from 'three';
import { GroupProps, PositionalAudioProps, useThree } from '@react-three/fiber';
import { PositionalAudio, useGLTF } from '@react-three/drei';
import { gsap, Elastic, Back, Expo } from 'gsap';
import { Settings, ShoeCameraAndAudio } from '../types';
import { defaultCameraPosition } from '../data';
import WhooshSound from '../assets/sounds/whoosh.mp3';

interface ShoeProps extends GroupProps {
  settings: Settings;
  onMounted: ({ camera, audio }: ShoeCameraAndAudio) => void;
  onAnimationEnded: (value: boolean) => void;
}

function Shoe(props: ShoeProps) {
  const { settings, onMounted, onAnimationEnded, ...rest } = props;
  const model = useGLTF('./models/shoe-draco.glb');
  const nodes = model.nodes as { [key: string]: Object3D & { geometry: BufferGeometry } };
  const { camera } = useThree();
  const audio = useRef<PositionalAudioProps>(null);
  const shoeRef = useRef<Group>(null);

  useEffect(() => {
    onMounted({ camera, audio: audio.current });
    if (!shoeRef.current) return;
    let tl: GSAPTimeline | null = gsap.timeline();

    tl.to(camera.position, {
      ...defaultCameraPosition,
      duration: 3,
      ease: Expo.easeInOut,
    })
      .fromTo(
        shoeRef.current?.position,
        { y: 10, z: -3 },
        { y: 0, z: 0, duration: 1, ease: Elastic.easeOut.config(0.2, 0.2) },
        '<',
      )
      .to(
        shoeRef.current?.rotation,
        {
          z: -0.5,
          duration: 0.5,
          ease: Back.easeOut.config(2.5),
        },
        '<0.4',
      )
      .then(() => {
        onAnimationEnded(true);
      });

    return () => {
      tl?.kill();
      tl = null;
    };
  }, [shoeRef.current]);

  return (
    <group ref={shoeRef} {...rest}>
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
      <PositionalAudio ref={audio} url={WhooshSound} distance={3} />
    </group>
  );
}

export default Shoe;
