import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
       <div className="chatInfodetail">
        {data.user?.photoURL && <a href={data.user?.photoURL}><img src={data.user?.photoURL} alt="" /></a>} 
        <span>{data.user?.displayName}</span>
       </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
