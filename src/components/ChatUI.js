import React from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import useMobile from '../hooks/useMobile';
import { copyToClipboard, formatDate } from '../hooks/utils';

const ChatUI = ({ messages }) => {
  const mobile = useMobile();
  const copyText = index => {
    const message = messages[index];
    return copyToClipboard(message.logText);
  };
  const width = mobile ? '95%' : '70%';
  return (
    <>
      {messages.map((message, index) => {
        return (
          <Box
            key={message.id ? message.id : message.date}
            p={4}
            borderRadius="md"
            bg="rgb(52, 53, 65)"
            w={width}
            mt={4}
          >
            <VStack spacing={2} align="flex-start">
              <Text fontSize="s" w="100%" textAlign={'right'}>
                <CopyIcon cursor={'pointer'} onClick={() => copyText(index)} />{' '}
              </Text>
              <Text fontWeight="bold">{message.user}</Text>
              <Text>{message.logText}</Text>
              <Text fontSize="xs" w="100%" textAlign={'right'}>
                {formatDate(message.date)}
              </Text>
            </VStack>
          </Box>
        );
      })}
      {/* <Box p={4} borderRadius="md" bg="rgb(52, 53, 65)" w={width} mt={4}>
        <VStack spacing={2} align="flex-start" mt={2}>
          <Text fontSize="xs" w="100%" textAlign={'right'}>
            <CopyIcon cursor={'pointer'} />{' '}
          </Text>
          <Text fontWeight="bold">ChatGPT</Text>
          <Text>Here is the response to your question.</Text>
          <Text fontSize="xs" w="100%" textAlign={'right'}>
            11-01-2020 2am
          </Text>
        </VStack>
      </Box> */}
    </>
  );
};

export default ChatUI;
