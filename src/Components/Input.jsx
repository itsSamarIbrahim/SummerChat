// /src/Components/Input.jsx

import React, { useContext, useState } from 'react'
import Img from "../img/img.png"
import Attach from "../img/attach.png"
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const Input = () => {

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handleSend = async() => {

    // Check if data and currentUser are defined
    if (!data || !data.chatId || !currentUser || !currentUser.uid) {
      console.error("Chat data or current user information is missing.");
      return; // Exit the function early if there's an issue
    }

     // Log the current values of text and img for debugging
    console.log("Text:", text);
    console.log("Image:", img);

    // Check if text or image is present
    if (!text.trim() && !img) {
      console.error("Cannot send an empty message.");
      return; // Exit if there's nothing to send
    }

    if(img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        () => {
          // setErr(true);
        },
        (error) => {
          // Handle any errors during upload
          console.error("Upload failed:", error);
        }, 
        async () => {
          // Get the download URL after the upload is complete
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          } catch (error) {
            console.error("Failed to get download URL:", error);
          }
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
      [data.chatId + ".lastMessage"]: {text},
      [data.chatId + ".date"]: serverTimestamp(),
    });

    // same thing for the other user
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {text},
      [data.chatId+".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className='input'>
      <input
        type="text"
        placeholder='Type something...'
        onChange={(e)=>setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{display:"none"}}
          id='file'
          onChange={(e) => { console.log("Selected file:", e.target.files[0]); // Log the selected file
            setImg(e.target.files[0]);}}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input