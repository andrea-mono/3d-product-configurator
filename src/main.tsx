import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import App from './App';
import './index.css';

const { Accordion, Button, Card, Heading } = chakraTheme.components;
const theme = extendBaseTheme({
  components: {
    Accordion,
    Button,
    Card,
    Heading,
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
