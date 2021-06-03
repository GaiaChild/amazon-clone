import React, { Component } from 'react'
import CurrencyFormat from 'react-currency-format'
import CardGiftcardRoundedIcon from '@material-ui/icons/CardGiftcardRounded';

import './Subtotal.css';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../data/StateProvider';

export function Subtotal(){

    const [state, dispatch] = useStateValue();
    const history = useHistory();
    const totalPrice = state.basket
        .map(item => item.price*100)
        .reduce((prev,next) => prev + next, 0) / 100

    return (
        <div className='subtotal'>
            <img
                className='subtotal__image'
                alt=''
                src='https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png'
            />
            <CurrencyFormat 
                renderText={value => (
                    <>
                        <p>
                            Subtotal ({state.basket.length} items): <strong>{value}</strong>
                        </p>
                        <small className='subtotal__gift'>
                        <CardGiftcardRoundedIcon fontSize={'small'}/>
                            &nbsp;<input type='checkbox'/>
                            &nbsp;This order contains a gift.
                        </small>
                    </>
                )}
                decimalScale={2}
                // value={getBasketTotal(basket)}
                value={totalPrice}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'₹'}
            />
            <button className='subtotal__button' onClick={()=>{
                console.log(state.user.email, state.basket.length)
                history.push('/payments')
            }} disabled={!state.user || !state.basket.length}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
