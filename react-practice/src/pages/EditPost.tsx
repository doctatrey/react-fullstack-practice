import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../styles/EditPost.module.css'
import { useState } from 'react'
import axiosInstance from '../axiosInstance'

interface postData {
    title: string;
    content: string;
}

const EditPost = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { id, title, content, author } = location.state || {}

    const [postData, setPostData] = useState<postData>({
        "title": title,
        "content": content
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = axiosInstance.patch(`/blog/${id}`, {
                title: postData.title,
                content: postData.content,
            })
            console.log(response)
            navigate('/blog')
        } catch (err) {
            console.error(`ERROR: ${err}`)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        const { name, value } = e.target;
        setPostData({...postData, [name]: value })
    }

    const reset = () => {
        setPostData({
            "title": "",
            "content": "",
        })
    }

  return (
    <div className={styles.mainContainer}>
        <div className={styles.userContainer}>
            <p className={styles.user}>User: {author}</p>
        </div>
      <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.header}>Edit Post</h1>
        <label className={styles.label}>Title</label>
        <input className={styles.title} type='text' name='title' value={postData.title} onChange={handleChange}/>
        <br/>
        <label className={styles.label}>Content</label>
        <textarea className={styles.content} name='content' value={postData.content} onChange={handleChange} />
        <br/>
        <div className={styles.buttons}>
            <input className={styles.submit} type='submit' value='Submit'/>
            <button className={styles.reset} type='reset' onClick={reset}>Reset</button>
        </div>
      </form>
      </div>
      <button className={styles.back} onClick={() => {navigate('/blog')}}>Back to Blog Page</button>
    </div>
  )
}

export default EditPost
