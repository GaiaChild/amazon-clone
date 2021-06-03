import React, { Component } from 'react'
import CheckoutProduct from '../components/CheckoutProduct';
import Subtotal from '../components/Subtotal'
import { useStateValue } from '../data/StateProvider'

import './CheckoutPage.css'

export function CheckoutPage() {

    const [state, dispatch] = useStateValue();

    return (
        <div className='checkout'>
            <div className='checkout__left'>
                <img
                    className='checkout__left__ad'
                    alt=''
                    src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668.jpg'
                />
                <div className='checkout__left__title'>
                    <h2>{state.basket.length ? 'Shopping Cart' : 'Your Amazon Basket is empty' }</h2>
                </div>
                <div className='checkout__left__products'>
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
                                visible={true}
                            />
                        ))
                    })()}        
                </div>
            </div>
            <div className='checkout__right'>
                <Subtotal className='checkout__right__subtotal'/>
            </div>
        </div>
    )
    
}

export default CheckoutPage
