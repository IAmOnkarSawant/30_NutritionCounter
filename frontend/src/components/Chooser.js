import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React from "react";
const Chooser = () => {
  let navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/album")}
        sx={{ mx: 1 }}
      >
        Ingredients
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/table")}
        sx={{ mx: 1 }}
      >
        Table
      </Button>
    </Box>
  );
};
export default Chooser;
