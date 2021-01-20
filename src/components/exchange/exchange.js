import React, {useContext} from 'react'
import './exchange.scss'
import {RateContext} from "../../context/RateContext";

export const Exchange = () => {
    const {state} = useContext(RateContext);
    const currency = {...state.currency}
    return (
        <div className='exchange'>
            <div className="exchangeContainer">
                <div className="exchangeContent">
                    <p>Current value: &nbsp;{state.base} &nbsp; Date: {state.date} </p>
                    <ul>

                        {
                            Object.keys(currency).map((item, i)=>{
                                return (
                                    <li key={item}>
                                        <span><img src={currency[item].flag} alt={item} /></span>
                                        <span>{`1${state.base} = ${currency[item].course} ${item} `}</span>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}