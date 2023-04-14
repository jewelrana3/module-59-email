import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../../firebase/firebase';
import { Link } from 'react-router-dom';


const auth = getAuth(app);

const Login = () => {
    const [error,setError] = useState('');
    const [menu,setMenu] = useState('');
    const emailRef = useRef();

    const handleLogin=event=>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)
        // event.target.reset()

        // validation
        setError('');
        setMenu('');

        if(!/(?=.*[A-Z])/.test(password)){
            setError('Add lest uppercase One chacter');
            return;
        }
        else if(password.length<6){
            setError('Pls add 6 chactors long');
            return;
        }
        createUserWithEmailAndPassword(auth,email,password)
    .then(result =>{
        const logIn = result.user;
        console.log(logIn);
        setMenu('success');
        event.target.reset()
    }).catch(error=>{
        setError(error.message)
    })
    }
    const handleReaetPassword=()=>{
        const email=emailRef.current.value;
        if(!email){
            alert('plase your email address')
        }
        sendPasswordResetEmail(auth,email)
        .then((email)=>{
           alert('plase cheak your email')
        }).catch(error=>{
            console.log(error);
            setError(error.message)
        })
    }

    
    
    return (
        <div className='w-25 mx-auto'>
            <form onSubmit={handleLogin} className="bg-light p-4 rounded">
                <h3 className="text-center mb-4">Login</h3>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" ref={emailRef} name='email' id="email" placeholder="name@example.com" required/>
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" name='password' id="password"  placeholder="Password" required/>
                    <label htmlFor="password">Password</label>
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Sign In</button>
                </div>
            </form>
            <p>Please forget password <button  onClick={handleReaetPassword}>Forget Password</button></p>
            <p>You new wewbsite ? Please Login <Link to="/register">Register</Link></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{menu}</p>
        </div>
        // email password >12qwertW
    );
};

export default Login;
