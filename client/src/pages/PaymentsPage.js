import { CardElement , useElements, useStripe } from '@stripe/react-stripe-js';
import axios from '../axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import CheckoutProduct from '../components/CheckoutProduct';
import { useStateValue } from '../data/StateProvider'
import {db} from '../firebase'

import './PaymentsPage.css'
import { useHistory } from 'react-router-dom';

function PaymentsPage() {

    const [state, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();
    const totalPrice = state.basket
        .map(item => item.price*100)
        .reduce((prev,next) => prev + next, 0) / 100
    const history = useHistory();
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [processing, setProcessing] = useState('')
    const [succeeded, setSucceeded] = useState(false)
    const [clientSecret, setClientSecret] = useState(true)

    useEffect(() => {

        const getClientSecret = async () => {

            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${totalPrice*100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
        console.log('The SECRET is >>>', clientSecret)

    },[totalPrice, clientSecret])

    const handleSubmit = async event => {
        event.preventDefault();
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {

            db.collection('users')
            .doc(state.user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: state.basket,
                amount: paymentIntent.amount / 100,
                created: paymentIntent.created
            })

            setSucceeded(true);
            setError(null);
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        }).catch(error => console.error(error?.message))
    }

    const handleChange = e => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : '')
    }

    return (
        <div className='payments'>
            <h1>Checkout <Link to='/checkout'>({state.basket.length} items)</Link></h1>
            <div className='payments__container'>

                {/* Payment section - delivery address */}
                <div className='payments__container__section'>
                    <div className='payments__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payments__address'>
                        <p>{state.user?.email}</p>
                        <p>97, Ashabar</p>
                        <p>Nivedita Road by-lane, Pradhan Nagar</p>
                        <p>Siliguri - 734003</p>
                    </div>
                </div>
                <hr/>
                {/* Payment section - Review Items */}
                <div className='payments__container__section'>
                    <div className='payments__title'>
                        <h3>Review Items</h3>
                    </div>
                    <div className='payments__items'>
                        {(() => {
                            const result = []
                            const ids = []
                            for(const item of state.basket){
                                if(!ids.includes(item.id)){
                                    ids.push(item.id)
                                    result.push(item)
                                }
                            }
                            return result.map((item, idx) => (
                                <CheckoutProduct
                                    itemId={item.id}
                                    title={item.title}
                                    price={item.price}
                                    ratings={item.ratings}
                                    image={item.image}
                                    visible={false}
                                />
                            ))
                        })()}
                    </div>
                </div>
                <hr/>
                <div className='payments__container__section'>
                    <div className='payments__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payments__details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <CurrencyFormat 
                                renderText={value => (
                                    <>
                                        <p>
                                            Order Total: <strong>{value}</strong>
                                        </p>
                                        
                                    </>
                                )}
                                decimalScale={2}
                                // value={getBasketTotal(basket)}
                                value={totalPrice}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'₹'}
                            />

                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : 'Pay Now'}</span>
                            </button>
                            
                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentsPage
