/**
* TODO:
* - CSS styling for attempting to edit another users blog
* - CSS styling for attempting to delete another users blog
**/

import React from 'react'
import { useState, useEffect } from 'react'
import axiosInstance from '../axiosInstance'
import styles from '../styles/BlogPage.module.css'
import NewPostBtn from '../components/newPostBtn'
import { useNavigate } from 'react-router-dom'
import LogoutButton from '../components/logoutButton'

interface Blog {
    _id: string,
    title: string,
    content: string,
    author: string,
    createdAt: Date,
}

const BlogPage = () => {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [username, setUsername] = useState('')
    const [sort, setSort] = useState<string>('lastCreated')

  // First useEffect: for token validation and username fetch
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/login');
        return;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp * 1000;
        if (Date.now() >= expirationTime) {
            localStorage.removeItem('token');
            navigate('/login');
            return;
        }

        // Fetch the username if the token is valid
        const getUsername = async () => {
            try {
                const response = await axiosInstance.get('/auth/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsername(response.data.username);
            } catch (err) {
                console.error('Error fetching user:', err);
                navigate('/login');
            }
        };
        getUsername();
    } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        navigate('/login');
    }
  }, []);

  // Second useEffect: for fetching and sorting blogs
  useEffect(() => {
    const fetchAndSortBlogs = async () => {
      try {
        const response = await axiosInstance.get<Blog[]>('http://localhost:2000/blog');
        const fetchedBlogs = response.data;
        
        // Sort immediately after fetching
        if (sort === 'lastCreated') {
          fetchedBlogs.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else if (sort === 'title') {
          fetchedBlogs.sort((a,b) => a.title.localeCompare(b.title));
        }
        
        setBlogs(fetchedBlogs);
      } catch (err) {
        console.error(`ERROR: ${err}`);
      }
    };
  
    fetchAndSortBlogs();
  }, [sort]);

  // Third useEffect: for sorting blogs
    useEffect(() => {
      const sortBlogs = () => {
        if (sort == 'lastCreated') {
          setBlogs(prevBlogs => [...prevBlogs].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        } else if (sort =='title') {
          setBlogs(prevBlogs => [...prevBlogs].sort((a,b) => a.title.localeCompare(b.title)));
        }
      }

      console.log("Sorting blogs...")
      sortBlogs();
    }, [sort])

  const deleteBlog = async (e: React.FormEvent, id: String, blog: Blog) => {
    e.preventDefault()
    
    if (username !== blog.author) {
      alert("You can only delete your own blogs.")
      return;
    }

    setBlogs(blogs => {
      return blogs.filter((blog) => blog._id != id)
    })

   try {
      const response = await axiosInstance.delete(`/blog/${id}`)
      console.log(response)
   } catch(err) {
      console.error('Error deleting blog:', err); 
   }
  }

  const handleEdit = (blog: Blog) => {
    if (username !== blog.author) {
      alert("You can only edit your own blogs.")
      return;
    }
    navigate(`/blog/edit`, { state: {
      id: blog._id,
      title: blog.title,
      content: blog.content,
      createdAt: blog.createdAt,
      author: blog.author,
     } 
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value)
  }

  const formatDate = (dateStr: Date) => {
    const date = new Date(dateStr)
    return date.toLocaleString()
  }

  return (
    <div>
      <div className={styles.navBar}>
      <a 
        className={styles.imgContainer} 
        href="https://github.com/doctatrey" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <img 
          className={styles.userImg} 
          src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" 
          alt="GitHub"
        />
      </a>
        <h1 className={styles.mainHeader}>Blog Posts</h1>
        <div className={styles.dropdown}>
          <span className={styles.imgContainer}>
            <img className={styles.userImg} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"/>
          </span>
          <div className={styles.dropdownContent}>
            <p>User: {username}</p>
            <LogoutButton />
          </div>
        </div>
      </div>
      <div className={styles.newPostContainer}>
        <NewPostBtn />
        <div className={styles.sortContainer}>
          <label className={styles.sortbyLabel}>Sort by:</label>
          <select name='sortby' className={styles.sortby} value={sort} onChange={handleChange}>
            <option value="lastCreated">Last Created</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>
      <div>
        {blogs.map((blog) => (
          <div className={styles.blogPost}>
            <strong className={styles.title}>{blog.title}</strong>
            <p className={styles.content}>{blog.content}</p>
            <p className={styles.author}>Author: {blog.author}</p>
            <p className={styles.createdAt}>Posted: {formatDate(blog.createdAt)}</p>
            <div className={styles.btn}>
              <form onSubmit={e => {deleteBlog(e, blog._id, blog)}}>
                <button className={styles.postBtn}>Delete</button>
              </form>
              <button className={styles.postBtn} onClick={() => {handleEdit(blog)}}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogPage
