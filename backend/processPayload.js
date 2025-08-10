import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Message from "./model/message.model.js"; 
import { MONGO_URI } from "./config.js";

const PAYLOADS_FOLDER = "./payloads";

// ====== DB CONNECT ======
await mongoose.connect(MONGO_URI);
console.log("Connected to MongoDB");

// ====== PROCESS FILES ======
const files = fs.readdirSync(PAYLOADS_FOLDER).filter(f => f.endsWith(".json"));

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(PAYLOADS_FOLDER, file), "utf8"));
  const change = data.metaData.entry[0].changes[0].value;

  // ---- 1. MESSAGES PAYLOAD ----
  if (change.messages && change.messages[0]?.from) {
    const msg = change.messages[0];
    const contact = change.contacts?.[0];

    const direction = msg.from.startsWith("91") && msg.from !== change.metadata.display_phone_number
      ? "inbound"
      : "outbound";

    await Message.create({
      wa_id: contact?.wa_id,
      name: contact?.profile?.name,
      from: msg.from,
      message_id: msg.id,
      body: msg.text?.body || "",
      timestamp: new Date(parseInt(msg.timestamp) * 1000),
      direction,
      status: "pending"
    });

    console.log(`Inserted message from ${contact?.profile?.name}`);
  }

  // ---- 2. STATUS PAYLOAD ----
  if (change.statuses) {
    for (const status of change.statuses) {
      const updateResult = await Message.updateOne(
        { message_id: status.id },
        { $set: { status: status.status } }
      );
      if (updateResult.modifiedCount > 0) {
        console.log(`Updated status for ${status.id} → ${status.status}`);
      }
    }
  }
}

console.log("Processing complete.");
process.exit();
