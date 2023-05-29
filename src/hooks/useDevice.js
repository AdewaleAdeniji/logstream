import { useEffect, useState } from 'react';

const useDevice = () => {
  const [deviceName, setDeviceName] = useState('');

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const devices = [
      { name: 'iPhone', regex: /iPhone/i },
      { name: 'iPad', regex: /iPad/i },
      { name: 'iPod', regex: /iPod/i },
      { name: 'Android', regex: /Android/i },
      { name: 'Mac', regex: /Macintosh/i },
      { name: 'Windows', regex: /Windows/i },
      { name: 'Linux', regex: /Linux/i },
    ];
    const browsers = [
      { name: 'Chrome', regex: /Chrome/i },
      { name: 'Firefox', regex: /Firefox/i },
      { name: 'Safari', regex: /Safari/i },
      { name: 'Edge', regex: /Edge/i },
      { name: 'Opera', regex: /Opera|OPR/i },
      { name: 'IE', regex: /MSIE|Trident/i },
    ];

    const matchedDevice = devices.find((device) => device.regex.test(userAgent));
    const matchedBrowser = browsers.find((browser) => browser.regex.test(userAgent));

    let device = matchedDevice ? matchedDevice.name : 'Unknown Device';
    let browser = matchedBrowser ? matchedBrowser.name : 'Unknown Browser';

    setDeviceName(`${device}-${browser}`);
  }, []);

  return deviceName;
};

export default useDevice;