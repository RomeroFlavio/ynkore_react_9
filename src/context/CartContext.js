import { createContext, useContext, useState } from 'react';
    
const CartContext = createContext([])

export const useCartContext = () => useContext(CartContext)

const CartContextProvider = ( {children} ) => {

    const [cartList, setCartList] = useState([])
    
    const addToCart = (objProducto) =>{
        if(cartList.length === 0){
            setCartList([
                ...cartList,
                objProducto
            ]);
        }else{
            InCart(objProducto);
        }
    };
    
    const InCart = (comparar) => {
        let producto = cartList.find(prod => prod.id === comparar.id)
        if(producto !== undefined){

            const productoIndex = cartList.indexOf(producto)
            !producto ? setCartList([...cartList, comparar]) : cartList[productoIndex].cantidad += comparar.cantidad
            return -1;
        }

        setCartList([
            ...cartList,
            comparar
        ])
    };

    const removeItem = (quit) => {
        let index = cartList.findIndex(product => product === quit);
        if(index !== -1){
            cartList.splice(index,1);
            setCartList([
                ...cartList
            ]);
        }
    }
    
    const vaciarCarrito = () =>{
        setCartList([])
    }
    
    return(
        <CartContext.Provider value={{
            cartList,
            addToCart,
            vaciarCarrito,
            removeItem
        }}>
            {children} 
        </CartContext.Provider>
    )
}

export default CartContextProvider