import { useEffect, useState } from "react";

export const useResize = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const isScreenMobile = window.innerWidth <= 768;
      setIsMobile(isScreenMobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return { isMobile };
};
