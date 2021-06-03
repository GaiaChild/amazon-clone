import React, { useState, useEffect } from 'react'

import Product from '../components/Product'
import './HomePage.css'
import image from '../assets/HomePage_ad.jpg'

export function HomePage() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("https://nozama-backend.herokuapp.com/products", {
            method: 'GET'
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            setProducts(data);
        })
        .catch(err => console.error(err))
    }, [])

    const productComp = products.map(item => {
        console.log("PRODUCT >>> ", item)
        return (
            <Product 
                className='home__row__product' 
                id={item._id} 
                title={item.title} 
                price={item.price} 
                ratings={item.ratings} 
                image ={item.image}
            />
        )})
    // for(var i = 0; i<Math.ceil(productComp.length/3); i++){
    //     twoColList.push((
    //         <div style={{display: 'flex'}}>
    //             {productComp.slice(3*i, 3*(i+1))}
    //         </div>
    //     ))
    // }

    return (
        <div className='home'>
            <div className='home__container'>
                <img
                    className='home__ad'
                    alt=''
                    src={'https://www.missmalini.com/wp-content/uploads/2021/01/The-Family-Man.jpg'}
                />
                <div className='home__products__container'>
                    {productComp}
                </div>
            </div>
        </div>
    )
}

export default HomePage




/* <div className='home__row'>
    <Product 
        className='home__row__product' 
        id='12345670' 
        title={'GRITSTONES Men\'s Regular Fit Shirt'} 
        price={383.00} 
        ratings={3} 
        image ={'https://images-na.ssl-images-amazon.com/images/I/71tHEf94tqL._UL1440_.jpg'}
    />
    <Product 
        className='home__row__product' 
        id='12345671'
        title={'Redmi 9A (Midnight Black, 2GB RAM, 32GB Storage)'} 
        price={6999.00} 
        ratings={4} 
        image ={'https://images-na.ssl-images-amazon.com/images/I/712Ex7xDndL._SL1500_.jpg'}
    />
</div>
<div className='home__row'>
    <Product 
        className='home__row__product' 
        id='12345672' 
        title={'Cadbury Silk Special Potli (343g)'} 
        price={585.00} 
        ratings={4} 
        image ={'https://images-na.ssl-images-amazon.com/images/I/718iw9xJ8wL._SL1500_.jpg'}
    />
    <Product 
        className='home__row__product' 
        id='12345673'
        title={'Rise of Kali: Duryodhana\'s Mahabharata'} 
        price={240.00} 
        ratings={5} 
        image ={'https://m.media-amazon.com/images/I/41IGLTetzeL.jpg'}
    />
    <Product 
        className='home__row__product' 
        id='12345674' 
        title={'PEDIGREE Adult Dry Dog Food (11Kg Pack)'} 
        price={1832.00} 
        ratings={4} 
        image ={'https://images-na.ssl-images-amazon.com/images/I/81kpT9DqMAL._SL1500_.jpg'}
    />
</div>
<div className='home__row'>
    <Product 
        className='home__row__product' 
        id='12345675'
        title={'Sony Bravia 164 cm (65 inches) 4K Ultra HD Certified Android LED TV 65X8000H (Black) (2020 Model)'} 
        price={123490.00} 
        ratings={5} 
        image ={'https://images-na.ssl-images-amazon.com/images/I/91UYojFHobL._SL1500_.jpg'}
    />
</div>
*/