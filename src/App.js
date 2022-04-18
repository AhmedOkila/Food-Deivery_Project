import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import {Fragment, useContext, useState} from "react";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);
    const showCart = () => {
        setCartIsShown(true);

    };
    const hideCart = () => {
        setCartIsShown(false);
    }
    return (
        <CartProvider>
        <Fragment>
            {cartIsShown && <Cart onClose={hideCart}/>}
            <Header onShowCart={showCart}/>
            <Meals/>
        </Fragment>
        </CartProvider>
    );
}

export default App;
