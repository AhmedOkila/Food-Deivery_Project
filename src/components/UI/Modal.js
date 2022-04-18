import classes from './Modal.module.css'
import {Fragment} from "react";
import {createPortal} from "react-dom";

const BackDrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClick}/>;
}
const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
}


const Modal = (props) => {
    const portalPlace = document.getElementById('modal-Overlay');
    return (
        <Fragment>
            {createPortal(<BackDrop onClick={props.onClick}/>, portalPlace)}
            {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalPlace)}
        </Fragment>
    )
}

export default Modal;