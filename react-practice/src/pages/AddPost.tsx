import React, { useState, useEffect } from 'react'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/AddPost.module.css'
 
const AddPost = () => {
    const navigate = useNavigate()

    const [postData, setPostData] = useState({
        "title": "",
        "content": "",
        "author": "",
        "createdAt": ""
    })
    const [username, setUsername] = useState('')

    useEffect(() => {

      const getUsername = async() => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('No token found');
            return;
          }
          
          const response = await axiosInstance.get('/auth/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data.username); 
          setUsername(response.data.username); 
        } catch (err) {
          console.error('Error fetching user:', err); 
        }
      }

      getUsername()
  }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setPostData({...postData, [name]: value })
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.post('/blog', {
                title: postData.title,
                content: postData.content,
                author: username,
            })
            const createdPost = response.data
            console.log(createdPost)
            setPostData({
                "title": "",
                "content": "",
                "author": "",
                "createdAt": ""
            })
            navigate('/blog')
        } catch (err) {
            console.error(`ERROR: ${err}`)
        }
    }

    const reset = () => {
      setPostData({
        "title": "",
        "content": "",
        "author": "",
        "createdAt": ""
      })
    }

  return (
    <div>
      <h1 className={styles.mainHeader}>Add New Post</h1>
      <form className={styles.container} onSubmit={handleSubmit}>
        <label className={styles.label}>Title</label>
        <input className={styles.title} type='text' name='title' value={postData.title} onChange={handleChange}/>
        <br/>
        <label className={styles.label}>Content</label>
        <textarea className={styles.content} name='content' value={postData.content} onChange={handleChange} />
        <br/>
        <input className={styles.submit} type='submit' value='Submit'/>
        <button className={styles.reset} type='reset' onClick={reset}>Reset</button>
      </form>
      <button className={styles.back} onClick={() => {navigate('/blog')}}>Back to Blog Page</button>
    </div>
  )
}

export default AddPost
