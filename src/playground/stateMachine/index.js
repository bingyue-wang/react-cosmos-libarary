import React, {useState} from 'react'
import {assign, Machine} from 'xstate'
// import {useMachine} from './hooks' // if want to use custom hook
import {useMachine} from '@xstate/react'
import Hello from './Hello/Hello'

import './style.scss'

function fakePayment() {
    return new Promise(((resolve, reject) => {
        setTimeout(() => {
            resolve('payment successful')
        }, 2000)
    }));
}

const stateMachine = Machine({
    initial: 'idle',
    context: {
        msg: ''
    },
    states: {
        idle: {
            on: {
                SUBMIT: [ // add Guard to conditionally go to next state when certain conditions are met
                    { // when all the field are filled, then go to 'loading' state, else go to 'error' state
                        target: 'loading',
                        cond: (ctx, event) => {
                            console.log(event)
                            return event.data.name !== '' && event.data.card !== ''
                        },
                    },
                    {target: 'error'},
                ],
            },
        },
        loading: {
            invoke: {
                id: 'doPayment',
                src: () => fakePayment(),
                onDone: {
                    target: 'success',
                    actions: assign({msg: (ctx, event) => event.data})
                },
                onError: {
                    target: 'error',
                    actions: assign({msg: (ctx, event) => event.data})
                }
            }
        },
        error: {
            on: {
                SUBMIT: {  // add Guard to conditionally go to next state when certain conditions are met
                    target: 'loading', // when all the field are filled, then go to 'loading' state
                    cond: (ctx, event) => {
                        console.log(event)
                        return event.data.name !== '' && event.data.card !== ''
                    },
                },
            },
        },
        success: {
            type: 'final',
        },
    },
})

const App = () => {
    const [machine, send] = useMachine(stateMachine)
    const [form, updateForm] = useState({
        name: '',
        card: '',
    })

    return <div className={'playground_stateMachine'}>
        <div className="pill-container">
            <div className="state-pill">current state: {machine.value}</div>
        </div>
        <Hello/>
        <div className="form-container">
            <div className="form-header">
                <h2>State Machine Payment Form</h2>
            </div>

            {machine.matches('error') ? (
                <div className="alert error">
                    {machine.context.msg ? machine.context.msg : 'You must fill out all the form fields.'}
                </div>
            ) : null}

            {machine.matches('success') ? (
                <div className="alert success">{machine.context.msg ? machine.context.msg : null}</div>
            ) : null}

            <div className="form-body">
                <form onSubmit={e => {
                    e.preventDefault()
                    send({
                        type: 'SUBMIT',
                        data: {...form},
                    })
                }}>
                    <div className="form-group">
                        <label htmlFor="NameOnCard">Name on card</label>
                        <input
                            id="NameOnCard"
                            name="name"
                            className="form-control"
                            type="text"
                            maxLength="255"
                            value={form.name}
                            onChange={e => updateForm({...form, name: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="CreditCardNumber">Card number</label>
                        <input
                            id="CreditCardNumber"
                            name="card"
                            className="null card-image form-control"
                            type="text"
                            value={form.card}
                            onChange={e => updateForm({...form, card: e.target.value})}
                        />
                    </div>
                    <button id="PayButton" className="btn-success" type="submit">
                        Pay Now
                    </button>
                </form>
            </div>
        </div>

        {/*{machine.value === 'success' ? (*/}
        {/*    <button*/}
        {/*        id="ResetButton"*/}
        {/*        className="btn-reset"*/}
        {/*        type="button"*/}
        {/*        onClick={() => this.transition('RESET')}*/}
        {/*    >*/}
        {/*        Reset*/}
        {/*    </button>*/}
        {/*) : null}*/}
    </div>
}

export default App
