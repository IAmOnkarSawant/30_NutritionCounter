// components/TeamSection.js
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import backgroundImage from "./images/section-bg1.jpg";
import pic1 from "./images/onkar.jpeg";
import pic2 from "./images/nithin.jpeg";
import pic3 from "./images/shubham.jpg";
import pic4 from "./images/rhitesh pic.jpg";


const teamMembers = [
  {
    name: "Onkar Sawant",
    role: "Mtech - CSE",
    image: pic1,
    description:
      "IIIT Hyderabad",
  },
  {
    name: "Nithin Venugopal",
    role: "Mtech - CSE",
    image: pic2,
    description:
      "IIIT Hyderabad",
  },
  {
    name: "Shubham Jaiswal",
    role: "Mtech - CSE",
    image: pic3,
    description:
      "IIIT Hyderabad",
  },
  {
    name: "Rhitesh Singh",
    role: "Mtech - CSIS",
    image: pic4,
    description:
      "IIIT Hyderabad",
  },
];

const TeamSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        padding: "80px 16px",
        textAlign: "center",
        height: "75vh",
        overflow: "hidden",
      }}
    >
      {/* Overlay */}
     

      <Container maxWidth="md">
        <Typography
          variant="h3"
          sx={{
            marginBottom: 4,
            position: "relative",
            color: "#fff",
            zIndex: 1,
          }}
        >
          Meet Our Team
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
        {teamMembers.map((member, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={member.image} // Make sure to replace with the actual path to the image
                alt={`Team Member ${index + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
            <Box
              sx={{
                marginTop: "20px",
                textAlign: "center",
                color: "#fff",
                padding: "0 16px",
              }}
            >
              <Typography variant="h6" gutterBottom>
                {member.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {member.role}
              </Typography>
              <Typography variant="body2">{member.description}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TeamSection;
