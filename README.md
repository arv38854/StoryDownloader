# Story Downloader — React + Express

## Project Structure

```
react-app/
├── frontend/        # Vite + React + Tailwind CSS
│   └── src/
│       ├── components/Downloader.jsx
│       ├── utils/detectPlatform.js
│       ├── App.jsx
│       └── main.jsx
└── backend/         # Express.js API server
    ├── utils/
    │   ├── detectPlatform.js
    │   └── extractMedia.js
    └── server.js
```

## Setup & Run

### 1. Install Backend Dependencies
```bash
cd react-app/backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd react-app/frontend
npm install
```

### 3. Start Backend (Terminal 1)
```bash
cd react-app/backend
npm run dev
# Runs on http://localhost:5000
```

### 4. Start Frontend (Terminal 2)
```bash
cd react-app/frontend
npm run dev
# Runs on http://localhost:5173
```

Open http://localhost:5173 in your browser.

## API

**POST** `/api/download`

Request:
```json
{ "url": "https://www.youtube.com/shorts/..." }
```

Response:
```json
{
  "success": true,
  "platform": "youtube",
  "downloadUrl": "https://...",
  "mediaType": "video"
}
```

## Supported Platforms
- YouTube Shorts (`youtube.com/shorts/`, `youtu.be/`)
- Instagram public posts/stories (`instagram.com`)
- Facebook public posts/reels (`facebook.com`, `fb.watch`)
