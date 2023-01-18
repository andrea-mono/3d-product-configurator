import React from 'react';
import { Camera } from '@react-three/fiber';
import { Grid, GridItem } from '@chakra-ui/react';
import Viewer from './Viewer';
import Controls from './Controls';
import { Settings, Section } from '../types';

interface ConfiguratorProps {
  settings: Settings;
  sections: Section[];
  disabledOrbitControls: boolean;
  onSetCamera: (camera: Camera) => void;
  onChangeSetting: (setting: keyof Settings, value: string) => void;
}

function Configurator({ settings, sections, disabledOrbitControls, onSetCamera, onChangeSetting }: ConfiguratorProps) {
  const handleSetCamera = (camera: Camera) => onSetCamera(camera);
  return (
    <Grid templateColumns="repeat(12, 1fr)" h="100%" gap={6}>
      <GridItem colSpan={8}>
        <Viewer settings={settings} disabledOrbitControls={disabledOrbitControls} onSetCamera={handleSetCamera} />
      </GridItem>
      <GridItem colSpan={4}>
        <Controls sections={sections} onChangeSetting={onChangeSetting} />
      </GridItem>
    </Grid>
  );
}

export default Configurator;
