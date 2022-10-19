import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from "firebase/auth";
import app from '../../Firebase/firebase.config'
import { Link } from 'react-router-dom';
const auth = getAuth(app)
const Register = () => {
    const [success, setSuccess] = useState(false)
    const [myerror , setError] = useState('')
    const handleRegister = (event)=>{
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        /*=================================================================
            Register or sign up code start
        ===================================================================*/
        createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const user = result.user;
            setSuccess(true);
            form.reset()
            console.log(user);
            updateUserName(name)
            verifyEmail()
        })
        .catch(error => setError(error.message))

        /*=================================================================
            Email verification start
        ===================================================================*/
        const verifyEmail = ()=>{
            sendEmailVerification(auth.currentUser)
            .then(()=>{
                alert('Please veryfy your email')
            })
        }

        /*=================================================================
            Update name start
        ===================================================================*/
        const updateUserName = (name)=>{
            updateProfile(auth.currentUser, {
                displayName : name
            })
            .then(()=>{
                console.log('display name updated')
            })
            .catch(error => console.log(error))
        }
    }
    return (
        <div className='w-50 mx-auto'>
            <h1>Register form</h1>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Enter name" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required/>
                </Form.Group>
                {
                success ? <p>Successfully submitted</p> : <p>{myerror}</p>

                }
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p>Already have an account <Link to='/login'>Login</Link></p>
        </div>
    );
};

export default Register;