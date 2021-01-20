import React from 'react';
import './calc.scss'
import {Counter} from "../../components/counter/counter";
import {CountResult} from "../../components/countResult/countResult";

export const Calc = () => {
    return (
        <div className='calculator'>
            <div className="calcContainer">
                <Counter/>
                <CountResult />
            </div>
        </div>
    );
}
