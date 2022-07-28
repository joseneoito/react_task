import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from "react-router-dom";

export default function ButtonAppBar() {

    const navigate = useNavigate();
    const {pathname} = useLocation()
    console.log("Location", pathname)
    const goBack =()=>{
         if(pathname == "/users"){
             return null
         }else{
             return navigate(-1)
        }
    }
    const getTitle =()=>{
        if(pathname === "/users"){
            return "Users"
        }else if(pathname === "/users/create"){
            return "Create"
        }else{
            return "User details"
        }
    }
  return (
    <Box sx={{ flexGrow: 1 }} data-testid="navbar-1">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>goBack()}
          >
      { pathname == "/users" ? <MenuIcon /> : <ArrowBackIcon/>}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {getTitle()}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
