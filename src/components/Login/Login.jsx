import React, { useState } from 'react';

const Login = () => {
    const [error,setError] = useState('');
    const [menu,setMenu] = useState('')

    const handleLogin=event=>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)

        // validation
        setError('');
        setMenu('');

        if(!/(?=.*[A-Z])/.test(password)){
            setError('Add lest uppercase One chacter');
            return;
        }
    }
    return (
        <div className='w-25 mx-auto'>
          
            <form onSubmit={handleLogin} className="bg-light p-4 rounded">
                <h3 className="text-center mb-4">Login</h3>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" name='email' id="email" placeholder="name@example.com" required/>
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
            <p className='text-danger'>{error}</p>
        </div>
    );
};

export default Login;
