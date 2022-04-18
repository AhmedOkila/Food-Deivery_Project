import MealItemForm from "./MealItemForm";
import classes from './MealItem.module.css';
import CartContext from "../../../store/cart-context";
import {useContext} from "react";

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);

    const AddItem = (amount) => {
        console.log(amount);
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    }

    return <li className={classes.meal}>
            <div >
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{props.price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAdd={AddItem}/>
            </div>
    </li>
}

export default MealItem;