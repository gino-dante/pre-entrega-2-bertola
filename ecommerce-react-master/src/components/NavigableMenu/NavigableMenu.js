import './NavigableMenu.css';
import { Link } from 'react-router-dom';
import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react';
import db from '../../utils/firebaseConfig';


const NavigableMenu = ({classProp}) => {

    const [categories, setCategories] = useState([])

    // Menu item de Material UI
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    /* "getCategories" obtiene de la db de firebase las categorías, con el map traigo el dato de todas 
    las categorias y con el reduce las guardo en valores únicos ya que si no se repiten por cada vez 
    que un producto tiene esa categoria*/

    const getCategories = async () => {

        const productSnapshot = await getDocs(collection(db, "bicicletas"));
        const productCat = productSnapshot.docs
            .map(cat => cat.data().category)
            .reduce((acc, el) => {
                if (!acc.find(d => d === el)) {
                    acc.push(el)
                }
                return acc
            }, []);

        setCategories(productCat)
    };

    useEffect(() => {

        getCategories()

    }, [])

    return (
        <nav className='nav__container'>
            <ul className={classProp}>
                <li>
                    <Link to={"/"}>
                        <Button
                            variant="text"
                            className='nav-btn'
                            sx={{ my: 2, color: { xs: '#1976D2', md: 'white'}}}
                        >
                            Home
                        </Button>
                    </Link>
                </li>
                <li>
                    <Button
                        className='nav-btn'
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        variant="text"
                        disableRipple
                        aria-expanded={open ? 'true' : undefined}
                        sx={{ my: 2, color: { xs: '#1976D2', md: 'white'}}}
                        onClick={handleClick}
                    >
                        Categorías
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}>
                        {categories.map((cat, i) => {
                            return (
                                <Link to={`/category/${cat}`} key={i}>
                                    <MenuItem onClick={handleClose}>
                                        {cat}
                                    </MenuItem>
                                </Link>
                            )
                        })}
                    </Menu>
                </li>
                <li>
                    <Button
                        variant="text"
                        className='nav-btn'
                        sx={{ my: 2, color: { xs: '#1976D2', md: 'white'}}}
                    >
                        <Link to={"/contacto"}>Contactarnos</Link>
                    </Button>
                </li>
            </ul>
        </nav>
    )
}

export default NavigableMenu;