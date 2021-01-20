import React, {Fragment, useContext} from 'react';
import './login.scss'
import {Button} from "../button/button";
import {RateContext} from "../../context/RateContext";

export const Login = () => {
    const {renderInputs, state, loginHandler} = useContext(RateContext)
    return (
        <Fragment>
            <div className='modelForm'>
                {renderInputs()}
            </div>
            <div className='modalBtn'>
                <Button disabled={!state.isFormValid} text='Log IN' click = {loginHandler} />
            </div>
        </Fragment>
    );
}