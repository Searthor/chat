import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import EmojiPicker, {
  EmojiStyle,
  Emoji
} from "emoji-picker-react";

const Input = () => {
  const [text, setText] = useState("");
  const [showPicker, setShowpicker] = useState(false);
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [images, setImages] = useState([]);
  const [imageurl, setImageurl] = useState([]);

  const onEmojiClick = (emojiData) => {
    setText(prenInput => prenInput + emojiData.emoji);

  }


  useEffect(() => {
    if (images == null) return;
    const newImageUrl = [];
    images.forEach((image) => newImageUrl.push(URL.createObjectURL(image)));
    setImageurl(newImageUrl)



  }, [images]);
  function onImageChange(e) {
    setImages([...e.target.files]);
    setImg(e.target.files[0])
  }

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
    setImages([]);
    setShowpicker(false);
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };
  return (
    <div className="input">
      {imageurl.map((imagesrc) => (<div className="images"><img src={imagesrc} alt="" /></div>))}
      
      <div className="inputs">
        <i className="fa-regular fa-face-smile" onClick={() => setShowpicker(val => !val)}></i>
        <input
          type="text"
          placeholder="Type something..."
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDown={handleKey}
          onClick={() => setShowpicker(false)}
        />
      </div>
      {showPicker &&
          <div className="picker"><EmojiPicker
            onEmojiClick={onEmojiClick}
            autoFocusSearch={false}
          />
          </div>
        }
      <div className="send">
        {text ? (
          <Emoji
            unified={text}
            emojiStyle={EmojiStyle.APPLE}
            size={22}
          />
        ) : null}

        {/* <img src={"https://winaero.com/blog/wp-content/uploads/2019/11/Photos-new-icon.png"} alt="" /> */}
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={onImageChange}
        />
        <label htmlFor="file">
          <i className="fa-regular fa-image image"></i>
        </label>
        <button onClick={handleSend} className="btn"><i className="fa-solid fa-paper-plane"></i></button>
        

      </div>
    </div>
  );
};

export default Input;