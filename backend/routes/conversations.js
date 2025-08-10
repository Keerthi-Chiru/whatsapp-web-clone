import express from 'express';
import Message from '../model/message.model.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const conversations = await Message.aggregate([
      { $sort: { timestamp: -1 } }, // sort newest first
      {
        $group: {
          _id: "$wa_id",
          name: { $first: "$name" },
          number: { $first: "$from" },
          lastMessage: { $first: "$body" },
          lastTimestamp: { $first: "$timestamp" },
        }
      },
      { $sort: { lastTimestamp: -1 } }
    ]);
    res.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    next(error);
  }
});

// Optional global error handler on this router
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

export default router;
