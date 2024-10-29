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
        padding: "80px 16px",
        textAlign: "center",
        height: "75vh",
        overflow: "hidden",
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
            color: "#000",
            zIndex: 1,
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
          zIndex: 1,
        }}
      >
        {/* Feature Card 1 */}
        <Card
          sx={{
            width: 300,
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
            width: 300,
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
            width: 300,
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
            width: 300,
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
