import axios from 'axios';
import { generateID, getDeviceName } from '../hooks/utils';
import configs from './config';
const APIS = {};
const bearer = `Bearer ${configs.API_KEY}`;

APIS.constructLog = async log => {
  return {
    logText: log,
    user: getDeviceName(),
    date: Date.now(),
    id: generateID(),
  };
};
APIS.createSession = async () => {
  var data = JSON.stringify({
    jsonData: '{"logs":[],"devices":"0"}',
    jsonKey: 'rshjdpskojjhjkjk',
    public: false,
  });

  var config = {
    method: 'post',
    url: configs.API_BASE_URL + '/app/json',
    headers: {
      Authorization: bearer,
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    return false;
  }
};
APIS.getLog = async streamCode => {
  var config = {
    method: 'get',
    url: `${configs.API_BASE_URL}/app/json/${streamCode}`,
    headers: {
      Authorization: bearer,
    },
  };
  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    return false;
  }
};
APIS.putLog = async log => {
  var data = JSON.stringify({
    jsonData: log,
  });

  var config = {
    method: 'put',
    url: `${configs.API_BASE_URL}/app/json/${log.id}`,
    headers: {
      Authorization: bearer,
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    return false;
  }
};
export default APIS;
