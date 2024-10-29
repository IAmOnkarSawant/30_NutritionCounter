// components/AboutSection.js
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@emotion/react";
import { useInView } from "react-intersection-observer";
import backgroundImage from "./images/wallp.jpg";

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const container = ref.current;

    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [ref]);

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "65vh",
        padding: "80px 16px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          marginTop: "100px",
          marginBottom: 4,
          fontStyle: "italic",
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "hsl(158,100%,20%)",
          animation:
            inView || isHovered
              ? `${fadeInAnimation} 0.5s ease-out 0s 1 normal forwards`
              : "none",
        }}
      >
        About Our Nutrition Counter App
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginBottom: 2,
          fontStyle: "italic",
          fontSize: "1.4rem",
          color: "hsl(158,100%,20%)",
          animation:
            inView || isHovered
              ? `${fadeInAnimation} 0.5s ease-out 0.5s 1 normal forwards`
              : "none",
        }}
      >
        The “Nutrition Counter” project offers a
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginBottom: 2,
          fontSize: "1.4rem",
          fontStyle: "italic",
          color: "hsl(158,100%,20%)",
          animation:
            inView || isHovered
              ? `${fadeInAnimation} 0.5s ease-out 1s 1 normal forwards`
              : "none",
        }}
      >
        solution to analyze food nutrition aiding
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.4rem",
          fontStyle: "italic",
          color: "hsl(158,100%,20%)",
          animation:
            inView || isHovered
              ? `${fadeInAnimation} 0.5s ease-out 1.5s 1 normal forwards`
              : "none",
          fontWeight: "350",
        }}
      >
        users in maintaining a healthier diet
      </Typography>
    </Box>
  );
};

export default AboutSection;
