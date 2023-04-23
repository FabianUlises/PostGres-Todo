// Dependencies
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
const Auth = () => {
    // Cookies
    const [cookies, setCookie, removeCookie] = useCookies(null); 
    // State
    const [error, setError] = useState(null);
    const [isLogIn, setIsLogIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // Function to display login or sign up
    const viewLogIn = (status) => {
        // Updating state
        setError(null);
        setIsLogIn(status);
    };
    // Function to login or sign up
    const handleSubmit = async(e, endpoint) => {
        e.preventDefault();
        if(!isLogIn && password !== confirmPassword) {
            setError('Make sure passwords match');
            setPassword('');
            setConfirmPassword('');
            return;
        };
        console.log(`fetching ${endpoint} route`);
        const res = await fetch(`http://localhost:4001/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password})
        });
        console.log(res);
        const data = await res.json();
        if(data.details) {
            setError(data.details)
        } else {
            setCookie('Email', data.email);
            setCookie('AuthToken', data.token);
            window.location.reload();
        }
    };
    return (
        <div className='auth-container'>
            <form className='auth-form'>
                <h2>{isLogIn ? 'Please log in' : 'Please sign up'}</h2>
                <input type='email' onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value) } />
                {/* Displaying this field only if user is not signed up */}
                {!isLogIn && <input type='password' placeholder='confim password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value) } />}
                <button type='submit' className='create-btn' onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')} >Submit</button>
                {/* Displaying errors if any */}
                {error && <p>{error}</p>}
            </form>
            <div className='auth-options'>
                <button onClick={() => viewLogIn(false)} style={{backgroundColor : !isLogIn ? 'grey' : 'whitesmoke'}} >Sign Up</button>
                <button onClick={() => viewLogIn(true)}>Login</button>
            </div>
        </div>
    )
};

export default Auth;