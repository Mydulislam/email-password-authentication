import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../Firebase/firebase.config'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
const auth = getAuth(app)
const Login = () => {
    const [success, setSuccess] = useState(false)
    const [webError, setwebError] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const handleLogin = (event)=>{
        event.preventDefault()
        setSuccess(false)
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password)
        signInWithEmailAndPassword(auth, email, password)
        .then(result=>{
            console.log(result.user)
            setSuccess(true)
        })
        .catch(error => setwebError("User not found"));
    }
    const handleEmail= (event)=>{
        const email = event.target.value;
        setUserEmail(email)
    }
    const handleForgotPassword = ()=>{
        if(!userEmail){
            alert('please insert your email');
            return
        }
        sendPasswordResetEmail(auth, userEmail)
        .then(
            alert('password reset email send. please check your email')
        )
        .catch(error =>console.log(error))
    }
    return (
        <div className='w-50 mx-auto'>
            <h1>Please Login</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handleEmail} type="email" name='email' placeholder="Enter email" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required/>
                </Form.Group>
                {success ? <p>Successfuly login</p> : <p>{webError}</p>}
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p>You are new please <Link to='/register'>Register</Link></p>
            <p>Forget your password. please<button onClick = {handleForgotPassword}>Forgot Password?</button></p>
        </div>
    );
};

export default Login;