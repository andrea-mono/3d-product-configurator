import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Color as IColor, Settings } from '../types';
import clickSound from '../assets/sounds/click.mp3';
import switchSound from '../assets/sounds/switch.mp3';

interface ColorProps extends IColor {
  title: keyof Settings;
  isActive: boolean;
  onClick: (setting: keyof Settings, value: string) => void;
}

function Color({ name, title, hex, isActive = false, onClick }: ColorProps) {
  const audio = {
    click: new Audio(clickSound),
    switch: new Audio(switchSound),
  };

  const play = (sound: keyof typeof audio) => {
    audio[sound].volume = 0.4;
    audio[sound].play();
  };

  const handleClick = () => {
    play('switch');
    onClick(title, hex);
  };

  return (
    <Button
      key={name}
      bgColor={!isActive ? 'white' : 'gray.200'}
      p={1}
      border="1px"
      borderColor="gray.300"
      borderRadius="8px"
      mr={2}
      onMouseEnter={() => play('click')}
      onClick={handleClick}
    >
      <Box bgColor={name} w="100%" h="100%" border="1px" borderColor="gray.100" borderRadius="5px" />
    </Button>
  );
}

export default Color;
