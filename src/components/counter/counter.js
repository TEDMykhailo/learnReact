import React, {useContext} from 'react';
import './counter.scss';
import {RateContext} from "../../context/RateContext";
import {Button} from "../button/button";

export const Counter = () => {
    const {state, inputValueHandler, currencyValueHandler, calculatorHandler} = useContext(RateContext)
    return (
        <div className='calcHead'>
            <div><h4>ExCange</h4></div>
            <div className="operation">
                <span>
                    <input
                        type='number'
                        value={state.inputValue}
                        onChange={inputValueHandler}
                    />
                    &nbsp; ruB</span>
                <select name="" id="" onChange={currencyValueHandler}>
                    {Object.keys(state.currency).map((item, i)=> {
                        return (
                            <option value={item} key={item}>{item}</option>
                        );
                    })}
                </select>
                <Button text='Count' click = {calculatorHandler} arg={state.currencyValue} />
            </div>
        </div>
    );
}