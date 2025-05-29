# 🎯 MoodMate – Emotional Wellbeing Tracker

MoodMate is a full-stack web application that helps users track their daily moods, visualize emotional patterns, and receive personalized AI-powered advice based on their mood history.

## Features

- 📅**Daily Mood Tracking**: Record your emotional state with optional notes
- 📈**Mood History**: View and filter your past mood entries
- 📊**Weekly Statistics**: Visualize mood distribution with interactive charts
- 🤖**AI-Powered Advice**: Receive personalized advice based on your recent mood patterns
- 📱**Responsive Design**: Works seamlessly across mobile, tablet and desktop devices

## Tech Stack

### Frontend
- React
- Tailwind CSS for styling
- Framer Motion for animations
- Chart.js for data visualization
- Axios for API requests
- Lucide React for icons

### Backend
- Express.js
- MongoDB with Mongoose
- OpenAI GPT API for generating personalized advice
- CORS for cross-origin resource sharing
- Dotenv for environment variable management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- OpenAI API key (for AI advice feature)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/moodtrack.git
cd moodtrack
```

2. Install dependencies
```
npm install
```

3. Set up environment variables
```
cp .env.example .env
```
Then edit the `.env` file to add your MongoDB connection string and OpenAI API key.

4. Start the development servers
```
npm run dev:all
```

This will start both the frontend (on port 3000) and backend (on port 5000) concurrently.

## Project Structure

```
moodtrack/
├── src/                  # Frontend React application
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Entry point
├── server/               # Backend Express application
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── services/         # Service modules (OpenAI, etc.)
│   └── index.js          # Server entry point
├── public/               # Static assets
└── .env         # environment variables
```

## API Endpoints

- `GET /api/entries` - Get all mood entries
- `POST /api/entries` - Create a new mood entry
- `GET /api/entries/stats` - Get weekly mood statistics
- `GET /api/entries/ai-advice` - Get AI-generated advice based on recent moods

## License

MIT License
