import './Item.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Item = ({ item }) => {

    const { title, price, pic1, id } = item;

    return (
        <div className='item-list'>
            <img alt={`Bicicleta ${title}`} src={`../assets/images/${pic1}`}/>
            <h3>{title}</h3>
            <p>${price}</p>
            <Link to={`/item/${id}`}>
                <Button variant="contained">Ver detalles</Button>
            </Link>
        </div>
    )
}

export default Item