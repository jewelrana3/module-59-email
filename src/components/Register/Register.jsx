import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from 'firebase/auth';
import app from '../../firebase/firebase';
import { Link } from 'react-router-dom';


const auth = getAuth(app)

const Register = () => {
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('')

    const handleSubmit = (event)=>{
        // 1.prevent page refeash
        event.preventDefault();
        // 2.collect from data
        setError('');
        setSuccess('')
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        console.log(name,email,password)
        // validate
        if(!/(?=.*[0-9])/.test(password)){
            setError('A number 2 side');
            return;
        }
        else if(!/([A-Z])/.test(password)){
            setError('A Letter chacter Uppercase');
            return;
        }
       else if(password.length<6){
        setError('Number 6 chacter update');
        return;
       }

        // 3.create in user fb
        createUserWithEmailAndPassword(auth,email,password)
        .then(result =>{
            const logOut = result.user;
            console.log(logOut);
            
            event.target.reset();
            setSuccess('Successfuly');
            sendVerificationEmail(result.user);
            updateDataNane(result.user,name)
           
        })
        .catch(error =>{
            console.log(error.message);
            setError(error.message)
        })
    }

    const sendVerificationEmail=(user)=>{
        sendEmailVerification(user)
        .then(result=>{
            console.log(result);
            alert('Your email virified ')
        })
    }

    const updateDataNane=(name,user)=>{
            updateProfile(user ,{
                    displayName:name
            })
            .then(()=>{
                console.log('update name')
            }).catch(error=>{
                setError(error.message)
            })
    }

    const handleEmail = (event)=>{
        // console.log(event.target.value);
        // setEmail(event.target.value)
    }

    const passwordBlur=(event)=>{
        // console.log(event.target.value)
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Register</h2>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4 rounded ps-2' type="text" name="name" id="name" placeholder='Yoour name' required/><br />
                <input className='w-50 mb-4 rounded ps-2' onChange={handleEmail} type="email" name="email" id="email" placeholder='Yoour Email' required/><br />
                <input className='w-50 mb-4 rounded ps-2' onBlur={passwordBlur} type="password" name="password" id="password" placeholder='Your Password' required/><br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p>Alredy account have an ? Please Login<Link to="/login">Login</Link></p>
            <p className='text-danger'>{error}</p>
            <p>{success}</p>
        </div>
    );
};

export default Register;