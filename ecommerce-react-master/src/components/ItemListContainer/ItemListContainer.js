import './ItemListContainer.css';
import ItemList from '../ItemList/ItemList';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore'
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader';
import db from '../../utils/firebaseConfig';


const ItemListContainer = ({ greeting }) => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { category } = useParams()

    const getProducts = async () => {

        const productSnapshot = await getDocs(collection(db, "bicicletas"));
        const productList = productSnapshot.docs.map(doc => {
            let product = doc.data()
            product.id = parseInt(doc.id)
            return product
        });

        setLoading(false)
        category === undefined ?
            setProducts(productList) :
            setProducts(productList.filter(el => el.category === category));

    };

    useEffect(() => {

        getProducts()

        return (() => {
            setLoading(true);
            setProducts([])
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])

    return (
        <>  
            <h1>Bike Store - Tienda de ciclismo</h1>
            <section>
                {greeting && <h2>{greeting}</h2>}
                {category !== undefined && <h2>{`Productos de la categoría ${category}`}</h2>}
                <div className="item-list__container">
                    {loading ? <SpinnerLoader /> : <ItemList items={products} />}
                </div>
            </section>
        </>
    );
}

export default ItemListContainer