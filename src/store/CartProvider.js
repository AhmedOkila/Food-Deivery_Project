import CartContext from "./cart-context";
import {useReducer} from "react";

const CartProvider = (props) => {


    const defaultCartState = {
        items: [],
        totalAmount: 0,
    }
    const cartReducer = (prevCartState, action) => {
        if (action.type === "ADD") {
            let updatedItems;
            let updatedItem;
            let updatedTotalAmount;
            updatedTotalAmount= Number(prevCartState.totalAmount) +
               Number( action.item.amount * action.item.price);

            const existedItemIndex = prevCartState.items.findIndex((item) => {
                return (item.id === action.item.id);
            })

            if (existedItemIndex !== -1) { // Existed
                const existedItem = prevCartState.items[existedItemIndex];
                updatedItem = {
                    ...existedItem,
                    amount: existedItem.amount + action.item.amount
                }
                updatedItems = [...prevCartState.items];
                updatedItems[existedItemIndex] = updatedItem;
            } else {
                updatedItems = prevCartState.items.concat(action.item)
            }
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount.toFixed(2),
            }
        }
        if (action.type === "REMOVE") {
            let updatedItems;
            let updatedItem;
            let updatedTotalAmount;
            const removedItemIndex = prevCartState.items.findIndex((item) => {
                return (item.id === action.item_id);
            })
            updatedTotalAmount = prevCartState.totalAmount -
                prevCartState.items[removedItemIndex].price;
            if (prevCartState.items[removedItemIndex].amount === 1) {
                updatedItems = prevCartState.items.filter((item)=>{
                    return (item.id !== action.item_id)
                })
            } else {
                const removedItem = prevCartState.items[removedItemIndex];
                updatedItem = {
                    ...removedItem,
                    amount: removedItem.amount - 1
                }
                updatedItems = [...prevCartState.items];
                updatedItems[removedItemIndex] = updatedItem;
            }
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount.toFixed(2),
            }


        }
        if (action.type === 'CLEAR') {
            return defaultCartState;
        }
        return defaultCartState
    }
    const addItemToCartHandler = (item) => {
        cartStateDispatcherFn({
            type: "ADD",
            item: item
        })
    }
    const removeItemFromCartHandler = (id) => {
        cartStateDispatcherFn({
            type: "REMOVE",
            item_id: id
        })
    }
    const clearCartHandler = () => {
        cartStateDispatcherFn({type: 'CLEAR'});
    };

    const [cartState, cartStateDispatcherFn] = useReducer(cartReducer, defaultCartState)

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }

    return <CartContext.Provider
        value={cartContext}
    >
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;