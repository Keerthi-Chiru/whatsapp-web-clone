import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { MONGO_URI } from "./config.js";
import conversationsRoute from "./routes/conversations.js";
import messagesRoute from "./routes/messages.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/conversations", conversationsRoute);
app.use("/messages", messagesRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
