# 📱 WhatsApp Web Clone - Rapidquest Assignment

A full-stack WhatsApp Web–like chat interface.  
Implements real-time-style messaging (frontend simulation), chat grouping, and message status updates — using provided webhook JSON payloads.

---

## 🚀 Features

- **Process WhatsApp Webhook Payloads** into MongoDB
- **Chat List Sidebar** with:
  - Contact name & number
  - Last message preview
  - Last message timestamp
- **Chat Window**:
  - Full message history (grouped by user `wa_id`)
  - Left/right aligned bubbles for inbound/outbound
  - Status icons: ✓ Sent, ✓✓ Delivered, Blue ✓✓ Read
  - Timestamps for each message
- **Send Message Box**:
  - Sends new message to selected contact
  - Saves via API in MongoDB
- **Responsive UI** with TailwindCSS
- Backend API: Node.js, Express, MongoDB (Mongoose)
- Frontend: React, Axios, Tailwind

---

## 🛠 Tech Stack

**Frontend:**
- React (Vite or CRA)
- TailwindCSS
- Axios

**Backend:**
- Node.js + Express
- MongoDB (Atlas) + Mongoose

---

## 📂 Project Structure

/frontend
├── src/
│ ├── components/
│ ├── App.js
│ ├── api.js
│ └── ...
/backend
├── routes/
├── model/
├── server.js
└── ...

text

---

## ⚙️ Installation & Local Setup

### Prerequisites
- Node.js >= 16
- MongoDB Atlas account
- NPM or Yarn

### Backend Setup
cd backend
npm install

Create .env file with:
MONGO_URI=your_mongodb_connection_string
PORT=5000
npm start

text

### Frontend Setup
cd frontend
npm install

In src/api.js, set API baseURL to backend URL (http://localhost:5000 for local dev)
npm start

text

---

## ☁️ Deployment Guide

### Deploy Backend (Render or Heroku)
1. Push backend code to GitHub.
2. **Render**:
   - Create a new Web Service from GitHub repo.
   - Set environment variables (`MONGO_URI`, `PORT`).
   - Deploy.
   - Note your public backend URL.
3. **Heroku**:
   - `heroku create`
   - `git push heroku main`
   - Set `MONGO_URI` in Heroku config vars.

### Deploy Frontend (Netlify or Vercel)
1. In `src/api.js`, change `baseURL` to your **deployed backend API**.
2. Push frontend code to GitHub.
3. **Netlify**:
   - New site → Import from GitHub → Build command: `npm run build` → Publish `build/` folder.
4. **Vercel**:
   - Import project → Set build command (`npm run build`) → Output: `build`.

---

## 🔍 API Endpoints

### GET `/conversations`
Returns list of chats with:
[
{
"_id": "919937320320",
"name": "Ravi Kumar",
"number": "919937320320",
"lastMessage": "Hi, I'd like to know more...",
"lastTimestamp": "2025-08-05T13:20:00.000Z"
}
]

text

### GET `/messages/:wa_id`
Returns all messages for a user.

### POST `/messages`
Inserts a new message:
{
"wa_id": "919937320320",
"body": "Hello!",
"contactName": "Ravi Kumar",
"from": "918329446654",
"timestamp": "2025-08-10T12:30:00.000Z",
"status": "sent"
}

text

---

## 📸 Screenshots (optional for submission)
- Sidebar chat list
- Chat window with messages
- Mobile responsive layout preview

---

## 📌 Submission Notes
- This project is developed for evaluation purposes under Rapidquest’s Full Stack Developer assignment.
- Tested locally and works when deployed with given instructions.
- Public URLs (to be filled after deployment):
  - **Frontend:** https://your-frontend-url.com
  - **Backend API:** https://your-backend-url.com

---