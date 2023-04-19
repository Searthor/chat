import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span></span>
      </div>
      <div className="messageContent">
        {message.text && <p >{message.text}</p>}

        {message.img && 
        <div className={`image ${message.senderId === currentUser.uid && "owner2"}`}> <a href={message.img}><img src={message.img} alt="" /></a></div>
        }


      </div>
    </div>
  );
};

export default Message;