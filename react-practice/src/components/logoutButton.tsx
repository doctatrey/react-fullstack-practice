import React from 'react'
import { useNavigate } from 'react-router-dom'

const logoutButton: React.FC = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default logoutButton
