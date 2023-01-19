import React, { useCallback } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import { Section, Settings } from '../types';
import Color from './Color';

interface ControlsProps {
  sections: Section[];
  settings: Settings;
  disabled: boolean;
  onChangeSetting: (setting: keyof Settings, value: string) => void;
}

function Controls({ sections, settings, disabled, onChangeSetting }: ControlsProps) {
  const handleClick = useCallback(
    (setting: keyof Settings, value: string) => {
      onChangeSetting(setting, value);
    },
    [onChangeSetting],
  );

  return (
    <Box h="100%" bgColor={settings.outer}>
      {!!sections && (
        <Card>
          <CardHeader pb={1}>
            <Heading size="md">Configurator</Heading>
          </CardHeader>
          <CardBody py={4}>
            <Stack divider={<StackDivider />} spacing={4}>
              {!disabled &&
                sections.map(({ title, colors }) => (
                  <Box key={title}>
                    <Heading size="xs" textTransform="uppercase" pb={2}>
                      {title}
                    </Heading>
                    <Box>
                      {colors.map(({ name, hex }) => (
                        <Color
                          key={name}
                          name={name}
                          title={title}
                          hex={hex}
                          isActive={settings[title] === hex}
                          onClick={handleClick}
                        />
                      ))}
                    </Box>
                  </Box>
                ))}
              {disabled &&
                sections.map(({ title }, i) => (
                  <Box key={title}>
                    <SkeletonText noOfLines={1} skeletonHeight="4" w={i % 2 ? '230px' : '300px'} mb={2} />
                    <Flex gap={2}>
                      <Skeleton h="40px" w="40px" />
                      <Skeleton h="40px" w="40px" />
                      <Skeleton h="40px" w="40px" />
                      <Skeleton h="40px" w="40px" />
                      {!(i % 2) && <Skeleton h="40px" w="40px" />}
                    </Flex>
                  </Box>
                ))}
            </Stack>
          </CardBody>
        </Card>
      )}
    </Box>
  );
}

export default Controls;
