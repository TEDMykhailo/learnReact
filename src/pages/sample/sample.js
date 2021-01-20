import React, {useContext} from 'react';
import './sample.scss'
import {RateContext} from "../../context/RateContext";
import {Button} from "../../components/button/button";

export const Sample = () => {
    const {state, baseHandler, base2Handler, sampleDateHandler, dataWrite, sampleRemove} = useContext(RateContext);
    return (
        <div className='sample'>
            <div className='sampleContainer'>
                <div>
                    <h3> get value &nbsp;
                        <select onChange={baseHandler} value={state.sample.base} name="" id="">
                            {
                                Object.keys(state.currency).map((item, i) => {
                                    return (
                                        <option value={item} key={item}>{item}</option>
                                    );
                                })
                            }
                        </select>
                        &nbsp; &nbsp; in &nbsp; &nbsp;
                        <select onChange={base2Handler} value={state.sample.base2} name="" id="">
                            {
                                Object.keys(state.currency).map((item, i) => {
                                    return (
                                        <option value={item} key={item}>{item}</option>
                                    );
                                })
                            }
                        </select>
                    </h3>Get value: &nbsp;
                </div>
                <div className='sampleHead'>
                    <span>
                        <input onChange={sampleDateHandler} type="date"/>
                    </span>
                    <Button text='get value' click = {dataWrite} arg = {state.sample}/>
                </div>
                <div className='sampleResult'>
                    <ul>
                        {
                            Object.keys(state.sampleList).map((item, i) => {
                                return (
                                    <li key={item}>
                                        <span>
                                            <img src={state.currency[state.sampleList[item].base].flag} alt={item} />&nbsp;
                                        </span>
                                        <span>
                                            {state.sampleList[item].date}
                                        </span>
                                        <span>
                                            {
                                                `${state.sampleList[item].course} ${state.sampleList[item].base2}`
                                            }
                                        </span>
                                        <button onClick={()=> sampleRemove(item)}>
                                            delete
                                        </button>
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
