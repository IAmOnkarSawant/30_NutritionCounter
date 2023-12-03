import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./images/foodwallpaper.jpg";

const HeroImage = () => {
  const navigate = useNavigate();
  const handleNavigateToStart = () => {
    navigate("/start");
  };
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "97vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textAlign: "center",
        padding: "0 16px",
      }}
    >
      {/* Black overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the transparency as needed
        }}
      />

      <Typography
        variant="h1"
        sx={{ marginBottom: 2, zIndex: 1, fontWeight: "500" }}
      >
        Welcome
      </Typography>
      <Typography
        variant="h2"
        sx={{
          marginBottom: 2,
          zIndex: 1,
          letterSpacing: "2px",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        Nutrition Counter App
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: 4, zIndex: 1 }}>
        Discover amazing features and meet our talented team.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleNavigateToStart}
      >
        Let's Start
      </Button>
    </Box>
  );
};

export default HeroImage;
