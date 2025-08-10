import mongoose from 'mongoose';
import Message from './model/message.model.js';
import { MONGO_URI } from './config.js';

await mongoose.connect(MONGO_URI);
console.log("Connected to MongoDB.");

await Message.deleteMany({});
console.log("All messages deleted!");

process.exit();
