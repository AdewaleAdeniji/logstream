import { useEffect, useState } from 'react';

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileWidth = window.innerWidth <= 768; // Adjust the breakpoint as needed

      setIsMobile(isMobileWidth);
    };

    handleResize(); // Check on initial render

    window.addEventListener('resize', handleResize); // Listen for resize events

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup the event listener
    };
  }, []);

  return isMobile;
};

export default useMobile;
