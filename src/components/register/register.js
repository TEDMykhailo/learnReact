import React, {Fragment, useContext} from 'react';
import './register.scss'
import {Button} from "../button/button";
import {RateContext} from "../../context/RateContext";

export const Register = () => {
    const {renderInputs, state, registerHandler} = useContext(RateContext)

    return (
        <Fragment>
            <div className='modelForm'>
                {renderInputs()}
            </div>
            <div className='modalBtn'>
                <Button click = {registerHandler} disabled={!state.isFormValid} text='registration' />
            </div>
        </Fragment>
    );
}