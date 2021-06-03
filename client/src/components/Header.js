import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from "react-router-dom";

import './Header.css'
import { useStateValue } from '../data/StateProvider';
import { auth } from '../firebase';

export function Header (){

    const [state, dispatch] = useStateValue();

    const signUserOut = () => {
        console.log(state.user)
        if(state.user){
            auth.signOut();
            
        }
    }

    const navElements = (
        <div className="nav__elements">
            <Link to={!state.user && '/login'}>
                <div className='header__nav__option' onClick={signUserOut}>
                    <span className='header__nav__option__lineOne'>
                        Hello, {state.user? state.user.displayName :'Guest'}
                    </span>
                    <span className='header__nav__option__lineTwo'>
                        {state.user ? 'Sign Out' : 'Sign In'}
                    </span>
                </div>
            </Link>
            <Link to={state.user && '/orders'}>
                <div className='header__nav__option'>
                    <span className='header__nav__option__lineOne'>
                        Returns
                    </span>
                    <span className='header__nav__option__lineTwo'>
                        &amp; Orders
                    </span>
                </div>
            </Link>
            <div className='header__nav__option'>
                <span className='header__nav__option__lineOne'>
                    Your
                </span>
                <span className='header__nav__option__lineTwo'>
                    Prime
                </span>
            </div>
        </div>
    )

    return (
        <div className='header'>
            <div className="header__menu__logo">
                <MenuIcon fontSize={'large'}/>
            </div>

            {/* Logo */}
            <Link to='/'>
                <img
                    className='header__logo'
                    alt=''
                    src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
                />
            </Link>

            {/* SearchBar */}
            <div className='header__search'>
                <input
                    className='header__search__input'
                    type='text'
                />
                <SearchIcon fontSize={'large'} className='header__search__logo'/>
            </div>
            {/* Nav */}
            <div className='header__nav'>
                {navElements}
                <Link to='/checkout'>
                    <div className='header__nav__cart'>
                        <ShoppingCartIcon className='header__nav__cart__logo' fontSize={'large'}/>
                        <span>
                            &nbsp;
                            {state.basket.length}
                            &nbsp;
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
