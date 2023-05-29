import APIS from '../api';
import { cleanupArray } from '../hooks/utils';

const services = {};

services.getStreams = () => {
  const t = localStorage.getItem('streamers') || '';
  return t.split(',');
};
services.saveStream = id => {
  var streams = services.getStreams();
  if (streams.indexOf(id) > -1) return false;
  streams.push(id);
  streams = cleanupArray(streams);
  localStorage.setItem('streamers', streams.join(','));
};
services.delog = log => {
  let parsedLog;

  try {
    parsedLog = JSON.parse(log);
  } catch (error) {
    // If parsing fails, assume `log` is already a parsed JSON object
    parsedLog = log;
  }

  return parsedLog.logs;
};

services.newMessage = async (logs, newlog) => {
  const logger = await APIS.constructLog(newlog);
  const buildLog = logs;
  buildLog.push(logger);
  const newData = {
    logs: buildLog,
  };
  return newData;
};
export default services;
