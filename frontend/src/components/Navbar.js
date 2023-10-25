import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#590561' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              SSD PROJECT
          </Link>
          </Typography>
          <nav>
            {user && (
              <div>
                <div>
                  <button color="inherit" onClick={handleClick}>Log out</button>
                </div>
              </div>
            )}
            {!user && (
              <div>
                <Link to="/login">
                  <button color="inherit" >Login</button>
                </Link>
                <Link to="/signup">
                  <button color="inherit">Signup</button>
                </Link>
              </div>
            )}
          </nav>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
