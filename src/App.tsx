import { Suspense, useRef, useState } from 'react';
import { Camera, PositionalAudioProps } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { gsap } from 'gsap';
import Configurator from './components/Configurator';
import { Settings, ShoeCameraAndAudio } from './types';
import { defaultCameraPosition, sections } from './data';

function App() {
  const mainCamera = useRef<Camera | null>(null);
  const shoeAudio = useRef<PositionalAudioProps | null>(null);
  const [initialAnimationEnded, setInitialAnimationEnded] = useState(false);
  const [activeSetting, setActiveSetting] = useState<keyof Settings>('none');
  const [settings, setSettings] = useState<Settings>({
    laces: '#FFF',
    caps: '#FFF',
    band: '#FFF',
    patch: '#FFF',
    stripes: '#FFF',
    sole: '#FFF',
    inner: '#FFF',
    outer: '#FFF',
  });

  const handleSetCamera = ({ camera, audio }: ShoeCameraAndAudio) => {
    mainCamera.current = camera;
    shoeAudio.current = audio;
  };

  const handleAnimationEnded = (value: boolean) => {
    setInitialAnimationEnded(value);
  };

  const moveCamera = (setting: keyof Settings) => {
    if (activeSetting === setting) return;
    const section = sections.find(({ title }) => title === setting);
    if (!mainCamera.current || !section) return;
    gsap.to(mainCamera.current?.position, section.cameraPosition);
    shoeAudio.current?.setLoop?.(false);
    shoeAudio.current?.play?.();
    if (!shoeAudio.current) return;
  };

  const changeSettings = (setting: keyof Settings, value: string) => {
    setActiveSetting(setting);
    moveCamera(setting);
    setSettings({ ...settings, [setting]: value });
  };

  const setDefaultBehavior = () => {
    setActiveSetting('none');
    if (!mainCamera.current) return;
    gsap.to(mainCamera.current?.position, defaultCameraPosition);
  };

  return (
    <>
      <Suspense fallback={null}>
        <Configurator
          settings={settings}
          sections={sections}
          activeSetting={activeSetting}
          initialAnimationEnded={initialAnimationEnded}
          disabledOrbitControls={activeSetting !== 'none'}
          onSetCamera={handleSetCamera}
          onAnimationEnded={handleAnimationEnded}
          onGoBack={setDefaultBehavior}
          onChangeSetting={changeSettings}
        />
      </Suspense>
      <Loader />
    </>
  );
}

export default App;
