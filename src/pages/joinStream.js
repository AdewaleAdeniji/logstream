import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import APIS from '../api';
import { useToast } from '@chakra-ui/react';
import services from '../services';

const JoinStream = () => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const [streamCode, setStreamCode] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const navigate = useNavigate();

  const handleJoinStream = async () => {
    setLoading(true);
    const res = await APIS.getLog(streamCode);
    setLoading(false)
    if (res) {
      await services.saveStream(streamCode);
      toast({
        title: 'Stream Sessioner joined.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      navigate(`/stream/${streamCode}`);
    } else {
      toast({
        title: 'Failed to join, Invalid Stream Key',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const handleOnModalClose = () => {
    onClose();
    navigate('/');
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleOnModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join Stream</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter stream code"
              value={streamCode}
              onChange={e => setStreamCode(e.target.value)}
            />
            <br/>
            Public Stream Code: ST-PUBLIC
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={handleJoinStream}
              isLoading={loading}
            >
              Join Stream
            </Button>
            <Button
              variant="ghost"
              onClick={handleOnModalClose}
              isLoading={loading}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JoinStream;
