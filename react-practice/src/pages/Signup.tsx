import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/Signup.module.css'

const Signup = () => {
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({
        "username": "",
        "email": "",
        "password": "",
    })
    
    const [isSuccess, setIsSuccess] = useState(false)
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!formData.username || !formData.email || !formData.password) {
                alert("Please fill in all fields");
                return;
            }
            await axios.post('http://localhost:2000/auth/signup', formData)
            setIsSuccess(true)
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error('Signup error:', (err as any).response?.data || err.message);
                alert((err as any).response?.data?.message || "Signup failed");
            } else {
                console.error('Signup error:', err);
                alert("Signup failed");
            }
        }
    }

    const handleSuccessClose = () => {
        setIsSuccess(false)
        navigate('/login')
    }

    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.header}>Signup</h1>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <input 
                        className={styles.username} 
                        name='username' 
                        placeholder='Username' 
                        onChange={handleChange}
                    />
                    <input 
                        className={styles.email} 
                        name='email' 
                        type='email' 
                        placeholder='Email' 
                        onChange={handleChange}
                    />
                    <input 
                        className={styles.password} 
                        name='password' 
                        type='password' 
                        placeholder='Password' 
                        onChange={handleChange}
                    />
                    <button className={styles.submit} type='submit'>Sign up</button>
                </form>
                <br/>
                <button 
                    className={styles.loginBtn} 
                    onClick={() => {navigate('/login')}}
                >
                    Already Have an Account?
                </button>
            </div>

            {isSuccess && (
                <div className={styles.successOverlay}>
                    <div className={styles.successContainer}>
                        <div className={styles.successIcon}>✓</div>
                        <h2 className={styles.successMessage}>Signup Successful!</h2>
                        <p className={styles.successSubMessage}>Your account has been created.</p>
                        <button 
                            className={styles.successButton} 
                            onClick={handleSuccessClose}
                        >
                            Continue to Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Signup