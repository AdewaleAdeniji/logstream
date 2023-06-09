import moment from 'moment';
export const getDeviceName = () => {
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

  const matchedBrowser = browsers.find(browser =>
    browser.regex.test(userAgent)
  );
  const matchedDevice = devices.find(device => device.regex.test(userAgent));

  let device = matchedDevice ? matchedDevice.name : 'Unknown Device';
  let browser = matchedBrowser ? matchedBrowser.name : 'Unknown Browser';

  return `${device}-${browser}`;
};

export function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    // Use the modern clipboard API if available
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Text copied to clipboard:', text);
        // You can show a success message or perform any other action here
      })
      .catch((error) => {
        console.error('Failed to copy text to clipboard:', error);
        // You can show an error message or handle the error here
      });
  } else {
    // Fallback for mobile devices or browsers that do not support the clipboard API
    const textField = document.createElement('textarea');
    textField.value = text;
    textField.style.position = 'fixed';
    textField.style.opacity = 0;
    document.body.appendChild(textField);
    textField.focus();
    textField.select();
  
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        console.log('Text copied to clipboard:', text);
        // You can show a success message or perform any other action here
      } else {
        console.error('Failed to copy text to clipboard.');
        // You can show an error message or handle the error here
      }
    } catch (error) {
      console.error('Failed to copy text to clipboard:', error);
      // You can show an error message or handle the error here
    }
  
    document.body.removeChild(textField);
  }
}


export const formatDate = date => {
  return moment(date).format('DD-MM-YYYY h:mm A');
};
export const generateID = () => {
  const timestamp = new Date().getTime().toString(); // get current timestamp as string
  const random = Math.random().toString().substr(2, 5); // generate a random string of length 5
  const userId = timestamp + random; // concatenate the timestamp and random strings
  return userId;
};
export const cleanupArray = array => {
  return array.filter(
    item => item !== '' && item !== undefined && item !== null
  );
};
