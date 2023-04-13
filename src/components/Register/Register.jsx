import React, { useState } from 'react';

const Register = () => {
    const [email,setEmail] = useState('')

    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log(event.target.email.value)
    }

    const handleEmail = (event)=>{
        // console.log(event.target.value);
        setEmail(event.target.value)
    }

    const passwordBlur=(event)=>{
        // console.log(event.target.value)
    }
    return (
        <div>
            <h2>Please Register</h2>
            <form onSubmit={handleSubmit}>
                <input onChange={handleEmail} type="email" name="email" id="email" placeholder='Yoour Email'/><br />
                <input onBlur={passwordBlur} type="password" name="password" id="password" placeholder='Your Password'/><br />
                <input type="submit" value="register" />
            </form>
        </div>
    );
};

export default Register;