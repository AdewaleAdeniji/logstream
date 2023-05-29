import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import useMobile from '../hooks/useMobile';
import { useNavigate } from 'react-router-dom';

const FixedHeader = ({ activeCode, loading }) => {
  const mobile = useMobile();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/join-stream');
  };
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="40px"
      bg="black"
      display="flex"
      alignItems="center"
      justifyContent={mobile ? 'space-between' : 'center'}
    >
      {mobile && <ArrowBackIcon ml={'30px'} onClick={handleGoBack} />}
      <Heading as="h2" size="md" color={'white'}>
        {loading ? 'Loading...' : activeCode}
      </Heading>
      <h1 className="v-none">MOBILE</h1>
    </Box>
  );
};

export default FixedHeader;
