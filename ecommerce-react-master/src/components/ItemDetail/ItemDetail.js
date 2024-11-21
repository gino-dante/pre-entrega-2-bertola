import './ItemDetail.css'
import ItemCount from '../ItemCount/ItemCount';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import CartContext from '../../context/CartContext';
import Swal from 'sweetalert2';

const ItemDetail = ({ prop }) => {

    const { title, price, stock, pic1, pic2, pic3, pic4, sizes, description, id } = prop;

    const { addProductToCart } = useContext(CartContext)

    const [size, setSize] = useState(null)
    const [bike, setBike] = useState(pic1)
    const [quantity, setQuantity] = useState(1)
    const [showButton, setShowButton] = useState(false)

    const onAdd = () => {
        if (size !== null) {
            setShowButton(true)
            addProductToCart({ title, price, pic1, quantity, id, size, stock })
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Tienes que seleccionar el talle de bicicleta que deseas',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    // Función para seleccionar la imagen principal en el grid
    const selectBike = (img) => {
        setBike(img)
    }

    return (
        <>
            <h1>Características de la bicicleta</h1>
        <div className="container">

            <img className="primary-pic" alt={`Bicicleta ${title}`} src={`../assets/images/${bike}`} />

            <img className="pic1 pic-detail" onClick={() => selectBike(pic1)} alt={`Bicicleta ${title}`} src={`../assets/images/${pic1}`} />
            <img className="pic2 pic-detail" onClick={() => selectBike(pic2)} alt={`Bicicleta ${title}`} src={`../assets/images/${pic2}`} />
            <img className="pic3 pic-detail" onClick={() => selectBike(pic3)} alt={`Bicicleta ${title}`} src={`../assets/images/${pic3}`} />
            <img className="pic4 pic-detail" onClick={() => selectBike(pic4)} alt={`Bicicleta ${title}`} src={`../assets/images/${pic4}`} />

            <div className='title'>
                <h3>{title}</h3>
                <h4 className='price'>${price}</h4>
            </div>

            <div className="detail">
                <p>Llega gratis en 5 días</p>
                <p>Abonalo en <span>12 cuotas sin interés</span> de ${parseInt(price / 12)}</p>
                <p className='detail__description'>{description}</p>
                <Autocomplete
                    disablePortal
                    className='autocomplete'
                    id="combo-box-demo"
                    options={sizes}
                    sx={{ width: 300 }}
                    value={size}
                    onChange={(e, newValue) => setSize(newValue)}
                    renderInput={(params) => <TextField {...params} label="Talle" />}
                />
            </div>

            <div className="buy">

                {!showButton ?
                    <ItemCount stock={stock} initial={1} onAdd={onAdd} updateQuantity={setQuantity} />
                    :
                    <Button variant="contained">
                        <Link to="/cart">Finalizar compra</Link>
                    </Button>}
            </div>
        </div>
        </>
    )
}

export default ItemDetail