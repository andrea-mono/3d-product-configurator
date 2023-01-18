import React, { useCallback } from 'react';
import { Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider } from '@chakra-ui/react';
import { Section, Settings } from '../types';
import Color from './Color';

interface ControlsProps {
  sections: Section[];
  onChangeSetting: (setting: keyof Settings, value: string) => void;
}

function Controls({ sections, onChangeSetting }: ControlsProps) {
  const handleClick = useCallback(
    (setting: keyof Settings, value: string) => {
      onChangeSetting(setting, value);
    },
    [onChangeSetting],
  );

  return (
    <>
      {!!sections && (
        <Card>
          <CardHeader pb={1}>
            <Heading size="md">Configurator</Heading>
          </CardHeader>
          <CardBody py={4}>
            <Stack divider={<StackDivider />} spacing={4}>
              {sections.map(({ title, colors }) => (
                <Box key={title}>
                  <Heading size="xs" textTransform="uppercase" pb={2}>
                    {title}
                  </Heading>
                  <Box>
                    {colors.map(({ name, hex }) => (
                      <Color key={name} name={name} title={title} hex={hex} onClick={handleClick} />
                    ))}
                  </Box>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default Controls;
