/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import FixedHeader from '../components/FixedHeader';
import ChatUI from '../components/ChatUI';
import Footer from '../components/Footer';
import services from '../services';
import { useToast } from '@chakra-ui/react';
import APIS from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const Stream = () => {
  //const [activeCode, setActiveCode] = useState('');
  const [streamCodes, setStreams] = useState(services.getStreams());
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [messages, setMessages] = useState([]);
  const { activeCode } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    //const code =
    services.saveStream(activeCode);
    fetchChat(activeCode);
  }, [activeCode]);
  useEffect(() => {
    const timer = setInterval(() => {
      setOffCheck(activeCode);
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [activeCode]);

  const setOffCheck = async streamCode => {
    const res = await APIS.getLog(streamCode);
    if (res) {
      const data = services.delog(res.json);
      setMessages(data);
    }
  };
  const fetchChat = async streamCode => {
    setLoading(true);
    const res = await APIS.getLog(streamCode);
    setLoading(false);
    if (res) {
      const data = services.delog(res.json);
      setMessages(data);
      //setOffCheck(streamCode);
    } else {
      toast({
        title: 'Failed to get stream, Invalid Stream Key',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleOnMessage = async message => {
    if (message === '') return;
    const formattedMessage = await APIS.constructLog(message);
    setMessages(prevMessages => [...prevMessages, formattedMessage]);
    setLoading(true);
    const m = messages;
    m.push(formattedMessage);
    const putJSON = await APIS.putLog({
      logs: m,
      id: activeCode,
    });
    setLoading(false);
    if (putJSON) {
      console.log('all good');
    } else {
      //setMessages()
      toast({
        title: 'Message failed to send',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      fetchChat(activeCode);
    }
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
      setStreams(services.getStreams());
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
  return (
    <div className="stream-chat">
      <div className="sidebar">
        <Sidebar
          streamCodes={streamCodes}
          activeCode={activeCode}
          loading={loading}
          handleCreateStream={handleCreateStream}
        />
      </div>
      <div className="s-chat">
        <FixedHeader activeCode={activeCode} loading={loading} />
        <ChatUI messages={messages.reverse()} />
      </div>
      <Footer onMessage={handleOnMessage} loading={loading} />
    </div>
  );
};

export default Stream;
