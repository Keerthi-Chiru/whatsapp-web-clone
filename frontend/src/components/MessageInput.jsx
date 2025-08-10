import React, { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="flex p-3 bg-white border-t border-gray-300">
      <input
        className="border rounded px-3 flex-1 mr-3 h-10 focus:outline-green-500"
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type a message"
        onKeyDown={e => e.key === "Enter" && send()}
      />
      <button
        className="bg-green-600 text-white rounded px-4 h-10 font-bold"
        onClick={send}
      >Send</button>
    </div>
  );
}
