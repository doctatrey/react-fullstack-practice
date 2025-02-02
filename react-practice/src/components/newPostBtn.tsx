import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/NewPostBtn.module.css'

const NewPostBtn = () => {
    const navigate = useNavigate();

  return (
    <div className={styles.btnContainer}>
      <button className={styles.btn} onClick={() => {navigate('/blog/add-new-post')}}>Create New Post</button>
    </div>
  )
}

export default NewPostBtn;
