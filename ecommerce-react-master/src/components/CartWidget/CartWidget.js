import './CartWidget.css'
import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Menu from '@mui/material/Menu';
import KeepBuying from '../KeepBuying/KeepBuying'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';

const CartWidget = () => {

    const { cartListItems, deleteProduct } = useContext(CartContext)


    // Importación de Material
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Badge 
                badgeContent={cartListItems.length} 
                className="cart-badge"
                color="error"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
            >
                <ShoppingCartIcon
                    className='icon-cart'
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                />
            </Badge>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <div>
                    {cartListItems.map((product, i) => {
                        const { title, pic1, price, size, quantity } = product
                        return (
                            <div className='cart-items-products' key={i}>
                                <img src={`../assets/images/${pic1}`} alt={`Bicicleta ${title}`} />
                                <div className='cart-items-products__detail'>
                                    <h4>{title}</h4>
                                    <p><b>${price}</b><span> - Cantidad: {quantity} - Talle {size}</span></p>
                                </div>
                                <DeleteForeverIcon className='delete-icon' onClick={() => deleteProduct(product)} />
                            </div>
                        )
                    })}
                    {cartListItems.length === 0 ?
                        <KeepBuying sendFn={handleClose}/>
                        :
                        <div className="checkout">
                            <Button variant="contained">
                                <Link to="/cart" onClick={handleClose}>Finalizar compra</Link>
                            </Button>
                        </div>}
                </div>
            </Menu>
        </>
    )
}

export default CartWidget