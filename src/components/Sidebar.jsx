import React, { useContext, useEffect } from 'react'
import Chats from './Chats'
import Navbar from './Navbar'
import Search from './Search'
import { ChatContext } from "../context/ChatContext";
import { useState } from 'react'


const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const [toggle, setToggle] = useState(true);
  const test = false;
  const { data } = useContext(ChatContext);
  const name = data.userc;
  useEffect(() => {
    if(name ===null){
      if(test===false && toggle===true){
        setActive(false);
      }
    }
    else if(name==='ff'){
      if(toggle===true && test===false){
        setActive(true);
      }
      else if(toggle===false && toggle===false){
        window.location.reload();
      }
    }
    
  });

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (

    <div className='containerbar'>
      <i id='show' onClick={handleToggle} className="fa-solid fa-arrow-left bar"></i>
      <div className={isActive ? 'sidebar ' : 'sidebar active'} id='sidebar'>
        <Navbar />
        <Search />
        <Chats />
      </div>

    </div>
  )
}

export default Sidebar