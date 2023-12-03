import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./test.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TeamSpace from "../components/TeamSpace";
import HeroImage from "../components/HeroImage";

function Test() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [showAboutContent, setShowAboutContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowAboutContent(true);
    }, 800);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNavigateToStart = () => {
    navigate("/start");
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      // Fetch nutrient data from your Express server
      // fetch('/api/home/delete-files')
      // .then((response) => response.text())
      // .then((data) => {
      //   console.log(data);
      // })
      // .catch((error) => {
      //   console.error('Error deleting files:', error);
      // });

      const response = await fetch("/api/home/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully.");
        handleNavigateToStart();
      } else {
        alert("Error uploading the file.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <center>
        <Container className="start-button">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleNavigateToStart}
          >
            Let's Start
          </Button>
        </Container>
      </center>
      <HeroImage/>
      <TeamSpace/>
    </div>
  );
}

export default Test;
