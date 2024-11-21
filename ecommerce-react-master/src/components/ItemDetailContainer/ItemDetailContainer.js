import './ItemDetailContainer.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'
import ItemDetail from '../ItemDetail/ItemDetail';
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader';
import db from '../../utils/firebaseConfig';

const ItemDetailContainer = () => {

    const [item, setItem] = useState({})
    const navigate = useNavigate()

    const { id } = useParams()

    const productFilter = async () => {
        const docRef = doc(db, "bicicletas", id)
        const docSnapshop = await getDoc(docRef)
        let product = docSnapshop.data()
        product.id = parseInt(docSnapshop.id)


        if (product === undefined) {
            navigate('/*')
        } else {
            setItem(product)
        }
    }

    useEffect(() => {

        productFilter()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {Object.keys(item).length === 0 ? <SpinnerLoader /> : <ItemDetail prop={item} />}
        </>
    )
}

export default ItemDetailContainer