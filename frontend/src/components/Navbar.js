import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = (targetId) => {
    logout();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#590561' }}>
        <Toolbar>
          <nav style={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
            <div>
              {user && (
                <div>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ border: '1px solid #1976D2', borderRadius: '4px' }}
                    onClick={() => handleClick("OCRSection")}
                  >
                    Log out
                  </Button>
                </div>
              )}
              {!user && (
                <div>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ border: '1px solid #1976D2', borderRadius: '4px' }}
                    onClick={() => handleClick("OCRSection")}
                  >
                    OCR MODULE
                  </Button>
                  <span style={{ marginLeft: '10px' }}></span>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ border: '1px solid #1976D2', borderRadius: '4px' }}
                    onClick={() => handleClick("SuggestionSection")}
                  >
                    OUR SUGGESTIONS
                  </Button>
                </div>
              )}
            </div>
            <div>
              {/* Add Let's Analyze button to the right */}
              <Button
                variant="outlined"
                color="primary"
                style={{ border: '1px solid #1976D2', borderRadius: '4px' }}
                onClick={() => handleClick("AnalyzeSection")}
              >
                Let's Analyze
              </Button>
            </div>
          </nav>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
