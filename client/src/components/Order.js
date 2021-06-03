import React from 'react';
import './Order.css';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct'

function Order({order}) {
    return (
        <div className='order'>
            <h2>Order</h2>
            <p className='order_amount'>
                Order Amount: ₹ {order.data.amount}
            </p>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className='order_id'>
                <small>Order ID: {order.id}</small>
            </p>
            {
                order.data.basket?.map(item => (
                    <CheckoutProduct
                                itemId={item.id}
                                title={item.title}
                                price={item.price}
                                ratings={item.ratings}
                                image={item.image}
                                visible={false}
                            />
                ))
            }
        </div>
    )
}

export default Order
