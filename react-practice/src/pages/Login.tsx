/**
* TODO:
* - CSS styling for incorrect / correct login information
**/

import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/Login.module.css'

const Login = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:2000/auth/login', formData)
            const token = response.data.token
            console.log('Received token:', token) // Add logging
            
            if (!token) {
                throw new Error('No token received from server')
            }
            
            localStorage.setItem('token', token)
            console.log('Token stored in localStorage:', localStorage.getItem('token')) // Verify storage
            
            alert("Login Successful!")
            window.location.href = '/blog'
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error('Login error:', (err as any).response?.data || err.message);
                alert((err as any).response?.data?.message || "Invalid credentials");
            } else {
                console.error('Login error:', err);
                alert("Invalid credentials");
            }
        }
    }

  return (
    <div>
        <div className={styles.container}>
            <h1 className={styles.header}>Login</h1>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <input className={styles.email} name='email' placeholder='Email' type='email' onChange={handleChange}></input>
                <input className={styles.password} name='password' placeholder='Password' type='password' onChange={handleChange}></input>
                <button className={styles.submit} type='submit'>Log in</button>
            </form>
            <br/>
            <button className={styles.signup} onClick={() => {navigate('/signup')}}>Don't Have an Account?</button>
        </div>
    </div>
  )
}

export default Login
