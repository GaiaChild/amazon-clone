import React, { useState } from 'react'
import { useStateValue } from '../data/StateProvider'
import StarRatings from 'react-star-ratings'

import './Product.css'

export function Product(props){

    const[state, dispatch] = useStateValue()
    // const [quantity, setQuantity] = useState(0)
    const {id, title, price, ratings, image} = props

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id,title,image,price,ratings
            }
        })
    }
    
    return (
        <div className='product'>
            <div className='product__info'>
                <p className='product__info__title' alt={title}>{title}</p>
                <p className='product__info__price'>
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <p className='product__info__rating'>
                    {
                        <StarRatings
                        rating={ratings}
                        starRatedColor="#F5B923"
                        numberOfStars={5}
                        name='rating'
                        starDimension={'17px'}
                        starSpacing={'2px'}
                      />
                    }
                    
                </p>
            </div>
            <img
                className='product__image'
                alt=''
                src={image}
            />
            <button 
                className='product__button' 
                onClick={addToBasket}
            >
                Add to Cart
            </button>
        </div>
    )
}

export default Product
