import React, { useContext } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)


  return (
    <div className='navbar'>
      <span className='logo'>Chat app</span>
      <div className="user">
        <div className="userinFo">
          <img src={currentUser.photoURL} alt="" />
          <span>{currentUser.displayName}</span>
        </div>
        <button onClick={() => signOut(auth)}><i className="fa-solid fa-right-to-bracket"></i></button>
      </div>
    </div>
  )
}

export default Navbar