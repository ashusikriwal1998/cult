import React, { useState } from 'react';
import {auth, db} from '../firebase'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import styled from "styled-components";

const style = {
  form: `h-15 w-full  flex text-xl absolute  p-1  justify-self-center max-w-4xl `,
  input: `w-full text-black text-xl p-3  text-white outline-none border-2 border-zinc-300	rounded-full`,
  button: `w-[20%]  border-2 border-blue-300	rounded-full bg-blue-100 text-blue-500`,
};

const SendMessage = ({scroll}) => {
  const [input, setInput] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault()
    if (input === '') {
        alert('Please enter a valid message')
        return
    }
    const {uid, displayName} = auth.currentUser
    await addDoc(collection(db, 'messages'), {
        text: input,
        name: displayName,
        uid,
        timestamp: serverTimestamp()
    })
    setInput('')
    scroll.current.scrollIntoView({behavior: 'smooth'})
  }

  return (

    <form onSubmit={sendMessage} className={style.form }>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={style.input}
        type='text'
        placeholder='Message'
      />
      <button className={style.button} type='submit'>
        Send
      </button>
    </form>

  );
};




export default SendMessage;