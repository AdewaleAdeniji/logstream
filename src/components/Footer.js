import React, { useState } from 'react';
import { Box, Flex, Input, Button } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import useMobile from '../hooks/useMobile';

const Footer = ({ onMessage, loading }) => {
  const mobile = useMobile();
  const [message, setMessage] = useState('');
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      return handleMessage();
    }
  };
  const handleMessage = () => {
    onMessage(message.trim());
    setMessage('');
  };
  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      width={mobile ? '100%' : 'calc(100% - 250px)'}
      ml={!mobile && '250px'}
      height="100px"
      bg="rgb(52, 53, 65)"
      p={4}
    >
      <Flex align="center" justify="center" height="100%">
        <Input
          onChange={e => setMessage(e.target.value)}
          variant="filled"
          value={message}
          placeholder="Type something..."
          size="lg"
          color={'white'}
          bg={'rgb(68, 70, 84)'}
          width="80%"
          onKeyDown={handleKeyPress}
        />
        <Button
          ml={2}
          colorScheme="teal"
          isLoading={loading}
          rightIcon={<ArrowRightIcon />}
          onClick={handleMessage}
        >
          Stream
        </Button>
      </Flex>
    </Box>
  );
};

export default Footer;
