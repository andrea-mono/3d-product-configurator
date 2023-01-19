import { Suspense, useRef, useState } from 'react';
import { Camera } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { gsap } from 'gsap';
import Configurator from './components/Configurator';
import { Color, Section, Settings } from './types';

const colors: Color[] = [
  { name: 'white', hex: '#FFF' },
  { name: 'black', hex: '#000' },
  { name: 'red.300', hex: '#FC8181' },
  { name: 'teal.300', hex: '#4FD1C5' },
  { name: 'blue.300', hex: '#63B3ED' },
];

const sections: Section[] = [
  {
    title: 'laces',
    cameraPosition: { x: 2, y: 1, z: -1 },
    colors,
  },
  {
    title: 'caps',
    cameraPosition: { x: 0.5542860820353702, y: 0.8278509533281209, z: -0.668901889917797 },
    colors,
  },
  {
    title: 'sole',
    cameraPosition: { x: -1.7107812030468106, y: -0.4635800439902054, z: -0.9264562688624984 },
    colors,
  },
  {
    title: 'stripes',
    cameraPosition: { x: -0.1890408923088476, y: 0.3853271747507067, z: -1.1206188660890541 },
    colors,
  },
  {
    title: 'patch',
    cameraPosition: { x: -0.9804075488944952, y: 1.0995543790668727, z: -0.018720941940398392 },
    colors,
  },
  {
    title: 'band',
    cameraPosition: { x: 0.31364413560025406, y: 1.13221513084451, z: -0.24436909315692462 },
    colors,
  },
  {
    title: 'outer',
    cameraPosition: { x: -0.305568366835359, y: 0.4794578559921891, z: -1.6177501970381514 },
    colors,
  },
  {
    title: 'inner',
    cameraPosition: { x: -0.5057572694743206, y: 1.0797635666005987, z: -0.1353522242738864 },
    colors,
  },
];

function App() {
  const mainCamera = useRef<Camera | null>(null);
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

  const handleSetCamera = (camera: Camera) => (mainCamera.current = camera);
  const moveCamera = (setting: keyof Settings) => {
    if (activeSetting === setting) return;
    const section = sections.find(({ title }) => title === setting);
    if (!mainCamera.current || !section) return;
    gsap.to(mainCamera.current?.position, section.cameraPosition);
  };

  const changeSettings = (setting: keyof Settings, value: string) => {
    setActiveSetting(setting);
    moveCamera(setting);
    console.log(mainCamera.current?.position);
    setSettings({ ...settings, [setting]: value });
  };

  const setDefaultBehavior = () => {
    setActiveSetting('none');
    if (!mainCamera.current) return;
    gsap.to(mainCamera.current?.position, { x: 1.5971027070081658, y: -0.06374976521564238, z: 1.2021642611149859 });
  };

  return (
    <>
      <Suspense fallback={null}>
        <Configurator
          settings={settings}
          sections={sections}
          activeSetting={activeSetting}
          disabledOrbitControls={activeSetting !== 'none'}
          onSetCamera={handleSetCamera}
          onGoBack={setDefaultBehavior}
          onChangeSetting={changeSettings}
        />
      </Suspense>
      <Loader />
    </>
  );
}

export default App;
