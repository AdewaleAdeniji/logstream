import React from 'react';
import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ streamCodes, activeCode, loading, handleCreateStream }) => {
  const navigate = useNavigate();
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      bottom={0}
      width={'250px'}
      bg="black"
      p={4}
      pt={20}
    >
      <Flex justify="space-between" mb={6} direction={'column'}>
        <Button
          colorScheme="teal"
          isLoading={loading}
          onClick={() => navigate('/join-stream')}
        >
          Join a New Stream
        </Button>
        <Button
          colorScheme="teal"
          mt={3}
          isLoading={loading}
          onClick={handleCreateStream}
        >
          Create a New Stream
        </Button>
      </Flex>

      <VStack spacing={2} align="flex-start">
        {streamCodes.map(stream => {
          return (
            <Button
              key={stream}
              onClick={() => navigate(`/stream/${stream}`)}
              variant={stream === activeCode ? 'solid' : 'outline'}
              w={'100%'}
              cursor={'pointer'}
              colorScheme="whiteAlpha"
              leftIcon={<ChatIcon />}
            >
              {stream}
            </Button>
          );
        })}
      </VStack>
    </Box>
  );
};

export default Sidebar;
