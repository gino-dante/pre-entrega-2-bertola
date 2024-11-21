import { createContext, useState } from "react";
import Swal from 'sweetalert2';

const CartContext = createContext()

const CartProvider = ({ children }) => {

    const [cartListItems, setCartListItems] = useState(JSON.parse(localStorage.getItem('products')) || [])
    const [totalPrice, setTotalPrice] = useState(JSON.parse(localStorage.getItem('total-price')) || 0)

    // Función para el borrado de productos
    const deleteProduct = (prod) => {

        // Filtro los productos distintos al que quiero borrar y los seteo en el context, por lo que eliminé el que selecciona el usuario
        const filteredProduct = cartListItems.filter(cartItem => cartItem !== prod)
        setCartListItems(filteredProduct)
        localStorage.setItem('products', JSON.stringify(filteredProduct))

        // Actualizo el precio total a mostrar
        setTotalPrice(totalPrice - prod.price * prod.quantity)
        localStorage.setItem('total-price', totalPrice - prod.price * prod.quantity)
    }


    const addProductToCart = (product) => {

        // Busco en el cartListItems el producto a agregar, si no lo encuentra (carga por primera vez), lo agrega
        let isInCart = cartListItems.find(cartItem => cartItem.id === product.id)

        if (!isInCart) {
            setCartListItems(cartListItems => [...cartListItems, product])
            setTotalPrice(totalPrice + product.price * product.quantity)
            localStorage.setItem('products', JSON.stringify([...cartListItems, product]))
            localStorage.setItem('total-price', totalPrice + product.price * product.quantity)

            Swal.fire({
                title: 'Agregado!',
                text: `Se agregaron ${product.quantity} productos correctamente`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })

        } else {

            // La siguiente lógica sirve para actualizar la cantidad del carrito en caso que el usuario 
            // vuelva a elegir la misma bicicleta, incluye lógica para que nunca supere el stock disponible

            const refreshQuantity = cartListItems.find(cartItem => cartItem.id === product.id)

            if (refreshQuantity.quantity + product.quantity <= product.stock) {

                refreshQuantity.quantity += product.quantity

                // Filtro todos los productos distintos al elegido, los vuelvo a setear en el setCartListItems
                // para así haber eliminado el que voy a actualizar, luego le agrego a esos productos 
                // el nuevo con la cantidad modificada
                const filteredProduct = cartListItems.filter(cartItem => cartItem.id !== product.id)
                setCartListItems(filteredProduct)
                setCartListItems(filteredProduct => [...filteredProduct, refreshQuantity])
                localStorage.setItem('products', JSON.stringify([...filteredProduct, refreshQuantity]))

                setTotalPrice(totalPrice + product.price * product.quantity)
                localStorage.setItem('total-price', totalPrice + product.price * product.quantity)


                Swal.fire({
                    title: 'Atención!',
                    text: `Ya tenías de este producto en el carrito, agregamos ${product.quantity} más`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar'
                })

            } else {
                Swal.fire({
                    title: 'Error',
                    text: `Ya tienes el máximo de cantidad de este producto, nuestro stock es de ${product.stock}`,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            }
        }
    }

    const data = {
        cartListItems,
        setCartListItems,
        addProductToCart,
        totalPrice,
        setTotalPrice,
        deleteProduct
    }

    return (
        <CartContext.Provider value={data}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext
export { CartProvider }