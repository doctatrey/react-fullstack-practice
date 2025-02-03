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
    
    const [loginState, setLoginState] = useState({
        isSuccess: false,
        isError: false,
        errorMessage: ''
    })
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Reset previous error state
        setLoginState({ isSuccess: false, isError: false, errorMessage: '' })
        
        try {
            const response = await axios.post('http://localhost:2000/auth/login', formData)
            const token = response.data.token
            
            if (!token) {
                throw new Error('No token received from server')
            }
            
            localStorage.setItem('token', token)
            setLoginState({ ...loginState, isSuccess: true })
        } catch (err: unknown) {
            let errorMessage = "Invalid credentials"
            
            if (axios.isAxiosError(err)) {
                errorMessage = err.response?.data?.message || "Invalid credentials"
            } else if (err instanceof Error) {
                errorMessage = err.message
            }
            
            setLoginState({ 
                isSuccess: false, 
                isError: true, 
                errorMessage: errorMessage 
            })
        }
    }

    const handleSuccessClose = () => {
        setLoginState({ isSuccess: false, isError: false, errorMessage: '' })
        window.location.href = '/blog'
    }

    const handleErrorClose = () => {
        setLoginState({ isSuccess: false, isError: false, errorMessage: '' })
    }

    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.header}>Login</h1>
                <form 
                    className={`${styles.formContainer} ${loginState.isError ? styles.shakeAnimation : ''}`} 
                    onSubmit={handleSubmit}
                >
                    {loginState.isError && (
                        <div className={styles.errorMessage}>
                            {loginState.errorMessage}
                        </div>
                    )}
                    <input 
                        className={`${styles.email} ${loginState.isError ? styles.errorInput : ''}`} 
                        name='email' 
                        placeholder='Email' 
                        type='email' 
                        onChange={handleChange}
                    />
                    <input 
                        className={`${styles.password} ${loginState.isError ? styles.errorInput : ''}`} 
                        name='password' 
                        placeholder='Password' 
                        type='password' 
                        onChange={handleChange}
                    />
                    <button className={styles.submit} type='submit'>Log in</button>
                </form>
                <br/>
                <button 
                    className={styles.signup} 
                    onClick={() => {navigate('/signup')}}
                >
                    Don't Have an Account?
                </button>
            </div>

            {loginState.isSuccess && (
                <div className={styles.successOverlay}>
                    <div className={styles.successContainer}>
                        <div className={styles.successIcon}>✓</div>
                        <h2 className={styles.successMessage}>Login Successful!</h2>
                        <p className={styles.successSubMessage}>You will be redirected to the blog page.</p>
                        <button 
                            className={styles.successButton} 
                            onClick={handleSuccessClose}
                        >
                            Continue to Blog
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login