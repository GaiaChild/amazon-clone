import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { auth } from '../firebase';

import './SignupPage.css'

function SignupPage() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [match, setMatch] = useState()

    const history = useHistory()

    const register = e =>{
        e.preventDefault();
        
        auth
            .createUserWithEmailAndPassword(email,password)
            .then(() => {
                auth.currentUser.updateProfile({
                    displayName: name.split(' ')[0]
                })
            })
            .then(() => history.push('/login'))
            .catch(error => alert(error.message))

        // auth.currentUser.updateProfile({
        //     displayName: name.split(' ')[0]
        // }).then(() => history.push('/login'))
        // .catch(error => alert(error.message))
    } 

    return (
        <div className='signup'>
            <Link to='/'>
                <img
                    className='signup__logo'
                    alt=''
                    src='https://lh3.googleusercontent.com/proxy/xz3v8C9EtRJC8ttcekybAvwCBHHmrNG1Xd-ZPstS_zivlej9VNUfPTUxiMDNAGQYeB29xC6AmKToKj2O0Oa0DBB1n8Xbe4kADQQHhA0j5a8fzTRt0qo1mJyCVFAbe52Eog_5BVIkO-wd7hv8tA'
                />
            </Link>
            <div className='signup__container'>
                <h2>Create an Account</h2>
                <form>
                    <h5>Full Name</h5>
                    <input type='text' value={name} onChange={e => setName(e.target.value)}/>
                    <h5>Email</h5>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                    <h5>
                        Confirm Password
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>
                            {match===false ? 'Passwords don\'t match\!' : ''}
                        </span>
                    </h5>
                    <input type='password' onChange={e => setMatch(e.target.value===password)}/>
                        <button disabled={match===false} onClick={event => register(event)}>Sign Up</button>
                    <span>By continuing, you agree to Amazon's <a>Conditions of Use</a> and <a>Privacy Notice</a>.</span>
                </form>
            </div>
        </div>
    )
}

export default SignupPage
