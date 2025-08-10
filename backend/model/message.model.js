import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  wa_id: String,                  // WhatsApp user ID
  name: String,                    // Contact name
  from: String,                    // Sender number
  message_id: String,               // WhatsApp message ID
  body: String,                     // Message text
  timestamp: Date,                  // When it was sent
  direction: { type: String, enum: ["inbound", "outbound"] },
  status: { type: String, enum: ["sent", "delivered", "read", "pending"], default: "pending" }
});

export default mongoose.model("ProcessedMessage", messageSchema);
