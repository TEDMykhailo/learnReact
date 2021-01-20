import React, {Fragment, useContext} from 'react';
import {AddClass} from "../../hoc/AddClass";
import './layout.scss'
import {Route, Switch} from "react-router-dom"
import {Header} from "../header/header";
import {Home} from "../../pages/home/home";
import {Sidebar} from "../sidebar/sidebar";
import {Calc} from "../../pages/calc/calc";
import {Sample} from "../../pages/sample/sample";
import {Info} from "../../pages/info/info";
import {RateContext} from "../../context/RateContext";


const Layout = () => {
    const {state} = useContext(RateContext)
    return (
        <Fragment>
            <Header/>
            <div className='content'>
                <div className='routes'>

                    {state.auth ? <Switch>
                            <Route path='/' exact component={Home}/>
                            <Route path='/calc' exact render={() => <Calc/>}/>
                            <Route path='/sample' exact component={Sample}/>
                            <Route path='/info' exact component={Info}/>
                        </Switch> :
                        <Switch>
                            <Route path='/' component={Home}/>
                        </Switch>


                    }

                </div>
                <Sidebar/>

                <div className='rightBlock'></div>
            </div>
        </Fragment>
    );
}

export default AddClass(Layout, 'layout')

