import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { auth } from '../firebase'
import image from '../assets/amazon-png-logo-vector-6695.png'

import './LoginPage.css'

function LoginPage() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const history = useHistory()

    const signIn = e => {
        e.preventDefault()

        auth
            .signInWithEmailAndPassword(email,password)
            .then(() => history.push('/'))
            .catch(err => alert(err.message))
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className='login__logo'
                    alt=''
                    src={image}
                />
            </Link>
            <div className='login__container'>
                <h2>Login</h2>
                <form>
                    <h5>Email</h5>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                    <button onClick={signIn}>Login</button>
                    <span>By continuing, you agree to Amazon's <a>Conditions of Use</a> and <a>Privacy Notice</a>.</span>
                </form>
            </div>
            <div className='login__signup'>
                <p>New to Amazon?</p>
                <Link to='/signup'>
                    <button>Create an Account</button>
                </Link>
            </div>
        </div>
    )
}

export default LoginPage
