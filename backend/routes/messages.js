import express from "express";
import Message from "../model/message.model.js"; 

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ timestamp: 1 }).lean();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});


// GET /messages/:wa_id → full chat history
router.get("/:wa_id", async (req, res) => {
  try {
const { wa_id } = req.params;
  const messages = await Message.find({ wa_id })
    .sort({ timestamp: 1 })
    .lean();
  res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { wa_id, body, contactName, from, timestamp, status } = req.body;

    const newMessage = await Message.create({
      wa_id,
      name: contactName,
      from,
      body,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      direction: from === wa_id ? "inbound" : "outbound", // determine direction
      status: status || "sent",
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
});

export default router;
