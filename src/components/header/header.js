import React, {useContext} from 'react';
import './header.scss'
import {Navbar} from "../navbar/navbar";
import {RateContext} from "../../context/RateContext";

export const Header = () => {
    const {modalShowHandler} = useContext(RateContext)
    return (
        <div className='header'>
            <div className='headerWrap'>
                <div className='logo'>
                    <a href="/">
                        <h2>RateApp</h2>
                    </a>
                </div>
                <Navbar/>
                <div className = "person">
                    <i onClick={modalShowHandler} style={{cursor:"pointer"}}>.!.</i></div>
            </div>
            <hr/>
        </div>
    );
}