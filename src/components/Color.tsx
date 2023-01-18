import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Color as IColor, Settings } from '../types';

interface ColorProps extends IColor {
  title: keyof Settings;
  onClick: (setting: keyof Settings, value: string) => void;
}

function Color({ name, title, hex, onClick }: ColorProps) {
  return (
    <Button
      key={name}
      bgColor="white"
      p={1}
      border="1px"
      borderColor="gray.300"
      borderRadius="8px"
      mr={2}
      onClick={() => onClick(title, hex)}
    >
      <Box bgColor={name} w="100%" h="100%" border="1px" borderColor="gray.100" borderRadius="5px" />
    </Button>
  );
}

export default Color;
