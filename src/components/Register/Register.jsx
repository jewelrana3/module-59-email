import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import app from '../../firebase/firebase';


const auth = getAuth(app)

const Register = () => {
    const [email,setEmail] = useState('')

    const handleSubmit = (event)=>{
        // 1.prevent page refeash
        event.preventDefault();
        // 2.collect from data
        const email = event.target.email.value;
        const password = event.target.password.value;
        // 3.create in user fb
        createUserWithEmailAndPassword(auth,email,password)
        .then(result =>{
            const logOut = result.user;
            console.log(logOut)
        })
        .catch(error =>{
            console.log(error)
        })
    }

    const handleEmail = (event)=>{
        // console.log(event.target.value);
        setEmail(event.target.value)
    }

    const passwordBlur=(event)=>{
        // console.log(event.target.value)
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Register</h2>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4 rounded ps-2' onChange={handleEmail} type="email" name="email" id="email" placeholder='Yoour Email'/><br />
                <input className='w-50 mb-4 rounded ps-2' onBlur={passwordBlur} type="password" name="password" id="password" placeholder='Your Password'/><br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;