// components/FeaturesSection.js
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import backgroundImage from "./images/feawallp.jpg";

const FeaturesSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "80px 16px", // Adjust padding as needed
        textAlign: "center",
        height: "75vh",
        overflow: "hidden", // Hide overflow to make sure the overlay covers the entire section
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          sx={{
            marginBottom: 4,
            fontSize: "2.5rem",
            fontWeight: "bold",
            position: "relative",
            color: "#000", // White text color
            zIndex: 1, // Keep text above the overlay
          }}
        >
          Key Features
        </Typography>
      </Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: "20px",
          marginTop: "120px",
          zIndex: 1, // Keep cards above the overlay
        }}
      >
        {/* Feature Card 1 */}
        <Card
          sx={{
            width: 300, // Set a fixed width
            height: "auto",
            marginBottom: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Default shadow
            transition: "box-shadow 0.3s, transform 0.3s",
            "&:hover": {
              boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)", // Enhanced shadow on hover
              transform: "translateY(-5px)", // Lift up effect
            },
          }}
        >
          <CardContent sx={{ padding: "20px" }}>
            {/* Adjusted inner padding */}
            <Typography variant="h6" gutterBottom>
              Macro-Nutrients Composition
            </Typography>
            <Typography variant="body2">
              Analysing macro-nutrients in food items based on text extracted
              from images
            </Typography>
          </CardContent>
        </Card>

        {/* Feature Card 2 */}
        <Card
          sx={{
            width: 300, // Set a fixed width
            height: "auto",
            marginBottom: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s, transform 0.3s",
            "&:hover": {
              boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
              transform: "translateY(-5px)",
            },
          }}
        >
          <CardContent sx={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Dietary Recommendations
            </Typography>
            <Typography variant="body2">
              Providing personalised dietary recommendations based on the
              analysis of food images and their nutritional content
            </Typography>
          </CardContent>
        </Card>

        {/* Feature Card 3 */}
        <Card
          sx={{
            width: 300, // Set a fixed width
            height: "auto",
            marginBottom: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s, transform 0.3s",
            "&:hover": {
              boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
              transform: "translateY(-5px)",
            },
          }}
        >
          <CardContent sx={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Health Condition-Specific Recommendations
            </Typography>
            <Typography variant="body2">
              Providing sample personalised calorie-based diet plans aligned
              with users' fitness goals
            </Typography>
          </CardContent>
        </Card>

        {/* Feature Card 4 */}
        <Card
          sx={{
            width: 300, // Set a fixed width
            height: "auto",
            marginBottom: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s, transform 0.3s",
            "&:hover": {
              boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
              transform: "translateY(-5px)",
            },
          }}
        >
          <CardContent sx={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Balanced Diet Plans
            </Typography>
            <Typography variant="body2">
              Providing personalised dietary recommendations based on the
              analysis of food images and their nutritional content
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default FeaturesSection;
