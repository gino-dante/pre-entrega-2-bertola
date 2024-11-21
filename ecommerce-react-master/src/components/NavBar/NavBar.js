import './NavBar.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import NavigableMenu from '../NavigableMenu/NavigableMenu'
import CartWidget from '../CartWidget/CartWidget'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';


export default function ButtonAppBar() {

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (

        <AppBar position="static" color='primary'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                        <Link to={"/"}>
                            <img
                                src="../assets/icons/icono-bike-store.svg"
                                alt="Logo de Bike Store"
                                className="logo-bike-store"
                            />
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <NavigableMenu classProp={"minim-nav"}/>
                        </Menu>
                    </Box>

                    <Box sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                    }}>
                        <Link to={"/"}>
                            <img
                                src="../assets/icons/icono-bike-store.svg"
                                alt="Logo de Bike Store"
                                className="logo-bike-store"
                            />
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1, color: 'white', display: { xs: 'none', md: 'flex' } }}>
                        <NavigableMenu classProp={"maxim-nav"}/>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <CartWidget />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
