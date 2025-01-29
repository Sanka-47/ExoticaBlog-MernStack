import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { pageData } from "./pageData";

import InputBase from "@mui/material/InputBase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Button from '@mui/material/Button';



export function Navbar() {


  const navigate = useNavigate()
  function handleLogout(){
    sessionStorage.removeItem("User")
    navigate("/")
  }

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
  
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));
  
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <div className="outline md:outline-[#e8ddce] mb-4">
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar className="bg-[#0f1523]">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, color: "#f4ddcd" }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <h1 className="edu-au-vic-wa-nt-guides text-2xl text-[#f4ddcd]">
              Exotica Blog
            </h1>
          </Typography>

          <div className="flex items-center gap-4">
            {pageData.map((page) => (
              <Link 
                key={page.path} 
                to={page.path}
              >
                <Button
                  sx={{
                    color: '#f4ddcd',
                    '&:hover': {
                      bgcolor: 'rgba(244, 221, 205, 0.08)'
                    }
                  }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
            
            <Button
              onClick={handleLogout}
              sx={{
                color: '#f4ddcd',
                border: '1px solid #f4ddcd',
                '&:hover': {
                  bgcolor: 'rgba(244, 221, 205, 0.08)',
                  border: '1px solid #f4ddcd'
                }
              }}
              variant="outlined"
            >
              Logout
            </Button>
          </div>

          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#f4ddcd" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  </div>
  );
}
