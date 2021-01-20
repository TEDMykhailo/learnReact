import React, {Fragment, useState, useContext} from 'react';
import './modal.scss';
import {Login} from "../login/login";
import {Register} from "../register/register";
import {RateContext} from "../../context/RateContext";

export const Modal = () => {
    const {modalHideHandler, state} = useContext(RateContext);

    const [value, setValue] = useState('Login');
    const links = [
        {name: 'Login', id: 'Login'},
        {name: 'Register', id: 'Register'},
    ];

    const cls = ['modal'];

    if(state.showModal){
        cls.push('modalShow')
    }

    const windowHandler = (id) => {
        setValue(id)
    }



    return (
        <div className={cls.join(' ')}>
            <Fragment>
                <div className='modalHead'>
                    <ul>
                        {links.map((item, i)=>{
                            return (
                                <li style = {{fontWeight: item.id === value ? 'bold' : 'normal',
                                            cursor: 'pointer'
                                }}
                                    key={item.name}
                                    onClick={() => windowHandler(item.id)}>{item.name}</li>
                            );
                        })}
                    </ul>
                    <i onClick={modalHideHandler} style={{cursor: 'pointer'}}>×</i>
                </div>
                <hr/>
            </Fragment>

            <h2 style={{color: "red", textAlign: "center"}}>{state.error}</h2>
            {value === 'Register' ? <Register /> : <Login />}
        </div>
    );
}