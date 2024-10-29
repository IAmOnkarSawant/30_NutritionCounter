import React, { useState } from "react";
import { AppBar, Button, CssBaseline, Box, Typography, Container, ThemeProvider, createTheme } from "@mui/material";
import Chooser from "../components/Chooser";
import NavbarAlbum from "../components/Navbar_Album"
import NavbarTable from "../components/Navbar"

const AlbumTableComponent = () => {
  const [view, setView] = useState("album"); 

  const handleChooseView = (chosenView) => {
    setView(chosenView);
  };

  const renderContent = () => {
    switch (view) {
      case "album":
        return <p>Album content rendered here.</p>;
      case "table":
        return <p>Table content rendered here.</p>;
      default:
        return <p>No view selected.</p>;
    }
  };

  const renderNavbar = () => {
    return view === "album" ? <NavbarAlbum /> : <NavbarTable />;
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {renderNavbar()}
      <Chooser onChoose={handleChooseView} />
      <Container>
        {renderContent()}
      </Container>
    </ThemeProvider>
  );
};

export default AlbumTableComponent;
