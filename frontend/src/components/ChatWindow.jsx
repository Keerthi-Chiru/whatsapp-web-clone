import React from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

export default function ChatWindow({ user, messages, onSend }) {
  if (!user) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center bg-gray-50">
        <p className="text-gray-400">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50">
      <div className="p-4 bg-green-600 text-white flex flex-col border-b">
        <span className="font-bold">{user.name}</span>
        <span className="text-xs">{user.number || user._id}</span>
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col gap-1 p-4">
{messages.length === 0
  ? <p className="text-gray-400 text-center mt-12">No messages found.</p>
  : messages.map((m, i) => (
      <MessageBubble 
        key={i} 
        message={m} 
        wa_id={user._id} // _id from conversations is actually wa_id
      />
    ))
}

      </div>
      <MessageInput onSend={onSend} />
    </div>
  );
}
