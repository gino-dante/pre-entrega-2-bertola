import './ItemList.css'
import Item from '../Item/Item';


const ItemList = ({ items }) => {

    return (
        <>
            {items.map((bike, index) => <Item item={bike} key={index} />)}
        </>
    )
}

export default ItemList