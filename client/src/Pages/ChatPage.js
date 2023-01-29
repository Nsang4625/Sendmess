import React, { useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  async function fetchChats() {
    const data = await axios.get('/api/chats');
    setChats(data);
  }
  useEffect(() => {
    fetchChats();
    return () => {
      
    }
  }, [])
  
  return (
    <div>ChatPage</div>
  )
}

export default ChatPage