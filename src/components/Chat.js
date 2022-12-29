import React from 'react'
import ChatMain from '../components/ChatMain'
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Header from './Header';
import styled from 'styled-components';


function Chat() {
  const [user] = useAuthState(auth);

  return (
    <div >
    
      <section >
          {user ? <ChatMain /> : null}
      </section>
    </div>
  )
}



export default Chat