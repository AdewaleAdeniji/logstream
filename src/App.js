import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages';
import JoinStream from './pages/joinStream';
import StreamPage from './pages/stream';
import './styles/index.css';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/join-stream" element={<JoinStream />}/>
        <Route path="/stream/:activeCode" element={<StreamPage /> }/>
      </Routes>
    </Router>

    </ChakraProvider>
  );
}

export default App;
