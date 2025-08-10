import React from "react";

// Your WhatsApp business phone number (same as in payload metadata)
const BUSINESS_NUMBER = "918329446654";

// WhatsApp checkmark icons
const statusIcon = (status) => {
  if (status === "sent") return "✓";
  if (status === "delivered") return "✓✓";
  if (status === "read") return <span className="text-blue-500">✓✓</span>;
  return status;
};

export default function MessageBubble({ message, wa_id }) {
  // Determine if message is inbound (from user) or outbound (from business)
  const isInbound = message.from === wa_id;
  const bubbleAlign = isInbound ? "items-start" : "items-end";
  const bubbleColor = isInbound ? "bg-white" : "bg-green-200";

  // Calculate 'to' dynamically without changing DB
  const toNumber = isInbound ? BUSINESS_NUMBER : wa_id;

  return (
    <div className={`flex flex-col ${bubbleAlign}`}>
      <div className={`rounded-xl px-4 py-2 mb-1 shadow ${bubbleColor} max-w-[70%]`}>
        <span>{message.body}</span>

        <div className="flex items-center gap-2 text-xs mt-1 text-gray-500">
          <span>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          {!isInbound && (
            <span className="ml-1">{statusIcon(message.status)}</span>
          )}
        </div>

        {/* Optional: show From / To for clarity */}
        <div className="text-[10px] text-gray-400 mt-1">
          From: {message.from} | To: {toNumber}
        </div>
      </div>
    </div>
  );
}
