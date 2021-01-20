import React from 'react';
import './App.scss';
import Layout from "./components/layout/Layout";
import {RateContext} from "./context/RateContext";
import axios from 'axios'

import CHF from './image/CHF.png'
import CNY from './image/CNY.png'
import EUR from './image/EUR.png'
import GBP from './image/GBP.png'
import JPY from './image/JPY.png'
import RUB from './image/RUB.png'
import USD from './image/USD.png'
import {Dark} from "./components/dark/dark";
import {Modal} from "./components/modal/modal";
import {Input} from "./components/input/input";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formControls: {
                email: {
                    value: '',
                    type: 'email',
                    label: 'Email',
                    errorMessage: 'enter correct Email',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        email: true
                    }
                },
                password: {
                    value: '',
                    type: 'password',
                    label: 'Password',
                    errorMessage: 'enter correct Password',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6
                    }
                }
            },
            showModal: false,
            base: 'USD',
            currency: {
                USD: {
                    name: 'USD',
                    flag: USD,
                    course: ''
                },
                RUB: {
                    name: 'RUB',
                    flag: RUB,
                    course: ''
                },
                JPY: {
                    name: 'JPY',
                    flag: JPY,
                    course: ''
                },
                EUR: {
                    name: 'EUR',
                    flag: EUR,
                    course: ''
                },
                CNY: {
                    name: 'CNY',
                    flag: CNY,
                    course: ''
                },
                CHF: {
                    name: 'CHF',
                    flag: CHF,
                    course: ''
                },
                GBP: {
                    name: 'GBP',
                    flag: GBP,
                    course: ''
                }
            },
            rate: {},
            date: '',
            //calc
            inputValue: 100,
            currencyValue: 'USD',
            result: null,
            // sample
            sample: {
                base: 'USD',
                base2: 'RUB',
                date: '',
                course: ''
            },
            sampleList: '',
            isFormValid: false,
            auth: false,
            error: '',
        }
    }

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true,
        }
        try{
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCte5DxbTXVL2tZTm_AmzsInCy-CRWTC-c', authData)
            if(response.data.idToken) {

                const formControls = {...this.state.formControls};
                formControls.email.value = '';
                formControls.password.value = '';

                this.setState({
                    auth: true,
                    showModal: false,
                    error: '',
                    formControls
                })
            }
        }catch (e){
            this.setState({error: 'error'})
            console.log(e)
        }
    }

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true,
        }
        try{
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCte5DxbTXVL2tZTm_AmzsInCy-CRWTC-c', authData)
            if(response.data.idToken) {

                const formControls = {...this.state.formControls};
                formControls.email.value = '';
                formControls.password.value = '';

                this.setState({
                    auth: true,
                    showModal: false,
                    error: '',
                    formControls
                })
            }
        }catch (e){
            console.log(e)
            this.setState({error: 'error'})
        }
    }

    modalShowHandler = () => {
        this.setState({showModal: true});
    }
    modalHideHandler = () => {
        this.setState({showModal: false});
    }


    validateControl = (value, validation) => {
        if(!validation) {
            return true;
        }

        let isValid = true;
        if(validation.required){
            isValid = value.trim() !== '' && isValid
        }

        if(validation.email){
            isValid = validateEmail(value) && isValid
        }

        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}
        const control  ={...formControls[controlName]}
        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        formControls[controlName] = control;
        this.setState({formControls, isFormValid});
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, i) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + i}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={true}
                    onChange={(event) => this.onChangeHandler(event, controlName)}
                />
            );
        })
    }

    dataWrite = async () => {

        await fetch(`https://api.exchangeratesapi.io/${this.state.sample.date}?base=${this.state.sample.base}`)
            .then((res) => res.json()).then((response) => {
                this.setState({sample: {...this.state.sample, course: response.rates[this.state.sample.base2]}})
            })

        await axios.post('https://rateapp-95202-default-rtdb.firebaseio.com/sample.json', this.state.sample)
            .then(res => '')

        await axios('https://rateapp-95202-default-rtdb.firebaseio.com/sample.json')
            .then((res) => {
                this.setState({sampleList: res.data})
            })
    }

    baseHandler = (event) => {
        this.setState({sample: {...this.state.sample, base: event.target.value}})
    }

    base2Handler = (event) => {
        this.setState({sample: {...this.state.sample, base2: event.target.value}})
    }

    sampleDateHandler = (event) => {
        this.setState({sample: {...this.state.sample, date: event.target.value}})
    }

    inputValueHandler = (event) => {
        this.setState({
            inputValue: event.target.value,
            result: null
        })
    }

    currencyValueHandler = (event) => {
        this.setState({
                currencyValue: event.target.value,
                result: null
            }
        )
    }

    calculatorHandler = async (value) => {
        let result2;

        await fetch(`https://api.exchangeratesapi.io/latest?base=RUB`)
            .then((res) => res.json())
            .then((res) => {
                result2 = res.rates[value] * this.state.inputValue;
            });

        this.setState({
            result: result2
        })
    }

    sampleRemove = async (id) => {
        let sampleList = {...this.state.sampleList}
        delete sampleList[id]

        this.setState({
            sampleList
        })

        await axios.delete(`https://rateapp-95202-default-rtdb.firebaseio.com/sample/${id}.json`)
    }


    componentDidMount() {
        // let this2 = this;
        fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
            .then((res) => res.json()).then((response) => {
            const rateArr = ['USD', 'RUB', 'EUR', 'CNY', 'CHF', 'GBP']
            const currency = {...this.state.currency}
            for (let i = 0; i < rateArr.length; i++) {
                currency[rateArr[i]].course = response.rates[rateArr[i]]
            }

            this.setState({
                currency: currency,
                rate: response.rates,
                date: response.date,
            })
        })

        axios('https://rateapp-95202-default-rtdb.firebaseio.com/sample.json')
            .then((res) => {
                this.setState({sampleList: res.data})
            })
    }

    render() {
        return (
            <RateContext.Provider value={{
                state: this.state,
                inputValueHandler: this.inputValueHandler,
                currencyValueHandler: this.currencyValueHandler,
                calculatorHandler: this.calculatorHandler,
                baseHandler: this.baseHandler,
                base2Handler: this.base2Handler,
                sampleDateHandler: this.sampleDateHandler,
                dataWrite: this.dataWrite,
                sampleRemove: this.sampleRemove,
                renderInputs: this.renderInputs,
                modalShowHandler: this.modalShowHandler,
                modalHideHandler: this.modalHideHandler,
                registerHandler: this.registerHandler,
                loginHandler: this.loginHandler,

            }}>
                <Dark showModal={this.state.showModal}
                      modalHideHandler={this.modalHideHandler}
                />
                <Modal/>
                <Layout/>
            </RateContext.Provider>
        )
    }
}

export default App;
