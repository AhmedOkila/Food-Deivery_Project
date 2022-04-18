import Input from "../../UI/Input";
import classes from './MealItemForm.module.css'
import {useRef} from "react";

const MealItemForm = (props) => {
    const amountInputRef = useRef()
    const formSubmitted = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        props.onAdd(enteredAmountNumber)

    }
    const input = {
        id: 'amount_' + props.id,
        type: 'number',
        min: '1',
        max: '5',
        step: '1',
        defaultValue: '1',

    };
    return <form className={classes.form} onSubmit={formSubmitted}>
        <Input
            label="Amount"
            ref={amountInputRef}
            input={input}
        />
        <button type="submit">+ Add</button>
    </form>
}

export default MealItemForm;