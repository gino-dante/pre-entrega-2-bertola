import './Cart.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useContext, useState } from 'react';
import CartContext from '../../context/CartContext';
import KeepBuying from '../../components/KeepBuying/KeepBuying';
import Button from '@mui/material/Button';
import Modal from '../../components/Modal/Modal'
import TextField from '@mui/material/TextField';
import { addDoc, collection } from 'firebase/firestore';
import db from '../../utils/firebaseConfig';
import Swal from 'sweetalert2';


const Cart = () => {

    const { cartListItems, setCartListItems, totalPrice, setTotalPrice, deleteProduct } = useContext(CartContext)
    const [showModal, setShowModal] = useState(false)
    const [formValue, setFormValue] = useState({
        name: '',
        phone: '',
        mail: ''
    })
    
    const [order, setOrder] = useState({
        buyer: {},
        items: cartListItems.map(item => {
            return {
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity
            }
        }),
        total: 0
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setOrder({...order, buyer: formValue, total: totalPrice})
        saveData({...order, buyer: formValue, total: totalPrice})
    }

    const handleChange = (e) => {
        setFormValue({...formValue, [e.target.name]: e.target.value})
    }

    const saveData = async (newOrder) =>{
        const orderFirebase = collection(db, 'ordenes')
        const orderDoc = await addDoc(orderFirebase, newOrder)
        Swal.fire({
            title: 'Compra confirmada',
            text: 'Tu pedido fue generado correctamente! En breve nos contactaremos para gestionar el pago.',
            footer: `ID de la operación: ${orderDoc.id}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })
        deleteAll()
        setShowModal(false)
    }

    //Función para el borrado total del carrito
    const deleteAll = () => {
        setCartListItems([]);
        localStorage.setItem('products', JSON.stringify([]))
        setTotalPrice(0)
        localStorage.setItem('total-price', 0)
    }

    return (
        <>
            <div className='cart-container'>
                {cartListItems.length === 0 ?
                    <KeepBuying />
                    :
                    <>
                        <h1>Terminar mi compra</h1>
                        <div className='title-container'>
                            <h3 className='hide-section'>Producto</h3>
                            <h3>Nombre</h3>
                            <h3 className='hide-section'>Talle</h3>
                            <h3>Precio x U.</h3>
                            <h3>Cantidad</h3>
                            <h3>Eliminar</h3>
                        </div>
                        <hr />
                    </>
                }
                {cartListItems.map((product, i) => {
                    const { title, pic1, price, size, quantity } = product
                    return (
                        <div className='cart-items-products' key={i}>
                            <img src={`../assets/images/${pic1}`} alt={`Bicicleta ${title}`} className='hide-section' />
                            <p>{title}</p>
                            <p className='hide-section'>{size}</p>
                            <p>${price}</p>
                            <p>{quantity}</p>
                            <DeleteForeverIcon className='delete-icon' onClick={() => deleteProduct(product)} />
                        </div>
                    )
                })}
            </div>
            {totalPrice > 0 &&
                <div className='check-out'>
                    <p className='check-out__total-price'>El total de tu carrito es ${totalPrice}</p>
                    <div className='check-out__btn'>
                        <Button variant="contained" onClick={() => setShowModal(true)}>Finalizar compra</Button>
                        <Button variant="outlined" onClick={deleteAll}>Eliminar todo</Button>
                    </div>
                </div>
            }
            <Modal title={'Finalizar mi compra'} open={showModal} handleClose={() => setShowModal(false)}>
                <form className='check-form' onSubmit={handleSubmit}>
                    <TextField
                        id="complete-name"
                        name="name"
                        label="Tu nombre completo"
                        variant="standard"
                        type="text"
                        value={formValue.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        id="phone"
                        name="phone"
                        label="Teléfono"
                        variant="standard"
                        type="number"
                        value={formValue.phone}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        id="email"
                        name="mail"
                        label="Email"
                        variant="standard"
                        type="email"
                        value={formValue.mail}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" variant="contained">Enviar</Button>
                </form>
            </Modal>
        </>
    )
}

export default Cart