import React from "react"

const CartContext = React.createContext({
    items:[],
    totalAmount:"",
    addItem:()=>{},
    removeItem:()=>{},
    clearCart: () => {}
})
export default CartContext;