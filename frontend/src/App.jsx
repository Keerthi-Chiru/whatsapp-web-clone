import React, { useEffect, useState } from "react";
import { getConversations, getMessages, sendMessage } from "./api";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";


export default function App() {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => { loadConversations(); }, []);

  const loadConversations = async () => {
    const { data } = await getConversations();
    setConversations(data);
  };

const selectUser = async (user) => {
  setSelectedUser(user);
  const { data } = await getMessages(user._id); // _id is wa_id in aggregation
  setMessages(data);
};

const handleSend = async (text) => {
  if (!selectedUser) return;

  const newMsg = {
    wa_id: selectedUser._id,     
    body: text,                  
    contactName: selectedUser.name,
    from: "918329446654",         
    timestamp: new Date(),
    status: "sent",
  };

  setMessages([...messages, newMsg]);
  await sendMessage(newMsg);          
};

  return (
    <div className="h-screen w-screen bg-gray-100 flex">
      <ChatList
        conversations={conversations}
        onSelect={selectUser}
        selectedUser={selectedUser}
      />
      <ChatWindow
        user={selectedUser}
        messages={messages}
        onSend={handleSend}
      />
    </div>
  );
}
