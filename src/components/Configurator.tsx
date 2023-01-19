import React from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import Header from './Header';
import Viewer from './Viewer';
import Controls from './Controls';
import { Settings, Section, ShoeCameraAndAudio } from '../types';

interface ConfiguratorProps {
  settings: Settings;
  sections: Section[];
  activeSetting: keyof Settings;
  initialAnimationEnded: boolean;
  disabledOrbitControls: boolean;
  onSetCamera: (cameraAndAudio: ShoeCameraAndAudio) => void;
  onAnimationEnded: (value: boolean) => void;
  onGoBack: () => void;
  onChangeSetting: (setting: keyof Settings, value: string) => void;
}

function Configurator({
  settings,
  sections,
  activeSetting,
  initialAnimationEnded,
  disabledOrbitControls,
  onSetCamera,
  onAnimationEnded,
  onGoBack,
  onChangeSetting,
}: ConfiguratorProps) {
  const handleSetCamera = (cameraAndAudio: ShoeCameraAndAudio) => onSetCamera(cameraAndAudio);
  return (
    <Grid templateColumns="repeat(12, 1fr)" h="100%">
      <GridItem position="relative" colSpan={8}>
        {activeSetting !== 'none' && <Header activeSetting={activeSetting} onGoBack={onGoBack} />}
        <Viewer
          settings={settings}
          initialAnimationEnded={initialAnimationEnded}
          disabledOrbitControls={disabledOrbitControls}
          onSetCamera={handleSetCamera}
          onAnimationEnded={onAnimationEnded}
        />
      </GridItem>
      <GridItem colSpan={4}>
        <Controls
          sections={sections}
          settings={settings}
          disabled={!initialAnimationEnded}
          onChangeSetting={onChangeSetting}
        />
      </GridItem>
    </Grid>
  );
}

export default Configurator;
