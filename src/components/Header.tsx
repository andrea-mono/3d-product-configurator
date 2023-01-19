import React from 'react';
import { Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Settings } from '../types';

interface HeaderProps {
  activeSetting: keyof Settings;
  onGoBack: () => void;
}

function Header({ activeSetting, onGoBack }: HeaderProps) {
  return (
    <Flex position="absolute" top={0} left={0} zIndex={1} w="100%" alignItems="center" gap={2} p={2}>
      <Text fontSize="3xl" fontWeight="light" userSelect="none" textTransform="uppercase">
        {activeSetting}
      </Text>
      <Spacer />
      <Button leftIcon={<ArrowForwardIcon />} onClick={onGoBack}>
        Go back
      </Button>
    </Flex>
  );
}

export default Header;
