import express from "express";
import Message from "../model/message.model.js"; 

const router = express.Router();

// GET /conversations → list of chats
router.get("/", async (req, res) => {
  try {
  const chats = await Message.aggregate([
    { $sort: { timestamp: -1 } }, // newest first
    {
      $group: {
        _id: "$wa_id",
        name: { $first: "$name" },
        number: { $first: "$from" },
        lastMessage: { $first: "$body" },
        lastStatus: { $first: "$status" },
        lastTimestamp: { $first: "$timestamp" },
      }
    },
    { $sort: { lastTimestamp: -1 } } 
  ]);
  res.json(chats);
  } catch (error) {
    res.status(500).json({ error: "Error fetching conversations" });
  }
});

export default router;
