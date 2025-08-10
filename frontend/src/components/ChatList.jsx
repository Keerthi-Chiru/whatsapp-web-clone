import { IoLogoWhatsapp } from "react-icons/io";

export default function ChatList({ conversations, onSelect, selectedUser }) {
  return (
    <div className="w-1/4 min-w-[240px] bg-white border-r border-gray-300 flex flex-col">
      <h3 className="p-4 font-semibold text-gray-700 border-b flex items-center gap-1"><IoLogoWhatsapp />Chats</h3>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((c) => (
          <div
            key={c._id}
            className={`p-4 cursor-pointer flex flex-col border-b border-gray-100 hover:bg-green-50 ${
              selectedUser?._id === c._id ? "bg-green-100" : ""
            }`}
            onClick={() => onSelect(c)}
          >
            <span className="font-bold text-sm">{c.name || "Unknown"}</span>
            <span className="text-xs text-gray-500">{c.number || c._id}</span>
            {/* --- show last message (truncate if long) --- */}
            <span className="text-xs text-gray-800 italic mt-1 truncate">
              {c.lastMessage ? c.lastMessage.slice(0, 35) : ""}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              {c.lastTimestamp
                ? new Date(c.lastTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
