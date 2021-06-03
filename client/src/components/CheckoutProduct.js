import React from 'react'
import { useStateValue } from '../data/StateProvider'
import StarRatings from 'react-star-ratings'

import './CheckoutProduct.css'

function CheckoutProduct(props) {
    
    const [state, dispatch] = useStateValue();
    const {itemId, title, price, ratings, image, visible} = props
    
    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: itemId,
                title,image,price,ratings
            }
        })
        console.log(state.basket)
    }

    const reduceFromBasket = () => {
        dispatch({
            type: 'REDUCE_FROM_BASKET',
            id: itemId
        })
        console.log(state.basket)
    }

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: itemId
        })
        console.log(state.basket)
    }

    const styles ={
        span: {
            display: 'inline-block',
            height: 25,
            width: 25,
            border: 'solid 1px #ddd',
            textAlign: 'center'
        },        
        button: {
            color: '#111',
            fontSize: '1.1rem',
            fontWeight: 500,
            backgroundColor: '#ddd',
            width: '25px',
            height: '25px',
            border: 'none',
            cursor: 'pointer'
        }
    }

    const quantity = visible ? (
        <div>
            <button style={styles.button} onClick={reduceFromBasket}>-</button>
            <span style={styles.span}>
                &nbsp;
                {
                    state.basket
                        .filter(item => item.id === itemId)
                        .length
                }
                &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <button style={styles.button} onClick={addToBasket}>+</button>
        </div>
    ):
    state.basket
        .filter(item => item.id === itemId)
        .length

    return (
        <div className='checkoutProduct'>
            <img
                className='checkoutProduct__image'
                alt=''
                src={image}
            />
            <div className='checkoutProduct__info'>
                <p>{title}</p>
                <small>₹</small>
                <strong>{price}</strong>
                <p className='checkoutProduct__info__rating'>
                    {
                        <StarRatings
                        rating={ratings}
                        starRatedColor="#FFD700"
                        numberOfStars={5}
                        name='rating'
                        starDimension={'15px'}
                        starSpacing={'2px'}
                      />
                    }
                </p>
            </div>
            <div className='checkoutProduct__buttons'>
                <div className='checkoutProduct__quantity'>
                    Qty:&nbsp;&nbsp;&nbsp;
                    {quantity}
                </div>
                <button style={{visibility: visible? 'visible':'hidden'}} className='checkoutProduct__remove' onClick={removeFromBasket}>Remove From Basket</button>
            </div>
            
        </div>
    )
}

export default CheckoutProduct
