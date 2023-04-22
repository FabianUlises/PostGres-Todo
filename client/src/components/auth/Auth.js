// Dependencies
import React, { useState } from 'react';
const Auth = () => {
    // State
    const [error, setError] = useState(null);
    const [isLogIn, setIsLogIn] = useState(true);
    // Function to display login or sign up
    const viewLogIn = (status) => {
        // Updating state
        setError(null);
        setIsLogIn(status);
    };
    return (
        <div className='auth-container'>
            <form className='auth-form'>
                <h2>{isLogIn ? 'Please log in' : 'Please sign up'}</h2>
                <input type='email'/>
                <input type='password' placeholder='password' />
                {/* Displaying this field only if user is not signed up */}
                {!isLogIn && <input type='password' placeholder='confim password' />}
                <button type='submit' className='create-btn'>Submit</button>
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