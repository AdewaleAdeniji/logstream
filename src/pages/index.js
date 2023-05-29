import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import APIS from '../api';
import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import services from '../services';

const LandingPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleJoinStream = () => {
    return navigate('/join-stream');
  };
  const handleCreateStream = async () => {
    setLoading(true);
    const t = await APIS.createSession();
    setLoading(false);
    if (t) {
      services.saveStream(t.id);
      toast({
        title: 'Stream Session created.',
        description: "We've created your stream for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      navigate(`/stream/${t.id}`);
    } else {
      toast({
        title: 'Error Occured',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  useEffect(()=>{
    const hasStreams = services.hasStreams();
    if (hasStreams) {
      return navigate(`/stream/${hasStreams}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <Box minHeight="100vh" p={4}>
      <Box maxWidth="600px" mx="auto" textAlign="center">
        <Heading as="h1" size="2xl" mt={10} color={'white'}>
          Welcome to Logstream
        </Heading>
        <Text as="h6" fontSize="lg" mt={4} color="white">
          Stream texts across multiple devices easily.
        </Text>
        <Flex direction="row" mt={10} gap={4} justifyContent={'center'}>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={handleCreateStream}
            isLoading={loading}
          >
            Create Stream
          </Button>
          <Button
            colorScheme="teal"
            size="lg"
            onClick={handleJoinStream}
            isLoading={loading}
          >
            Join Stream
          </Button>
        </Flex>

        <Box mt={10}>
          <Text fontSize="sm" color="gray.100">
            Created by Feranmi
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
export default LandingPage;
