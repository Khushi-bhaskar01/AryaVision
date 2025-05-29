require('dotenv').config(); 
const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry').default;
const { OpenAI } = require('openai');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// @route   POST api/entries
// @desc    Create a new mood entry
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { mood, note } = req.body;
    
    const newEntry = new Entry({
      userId: req.user.id,
      mood,
      note
    });
    
    const entry = await newEntry.save();
    res.json(entry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/entries
// @desc    Get all entries for a user
// @access  Private
router.get('/',  async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/entries/:id
// @desc    Delete an entry
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    
    // Check if entry exists
    if (!entry) {
      return res.status(404).json({ msg: 'Entry not found' });
    }
    
    // Check if user owns the entry
    if (entry.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    await entry.deleteOne();
    res.json({ msg: 'Entry removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/entries/stats
// @desc    Get weekly mood stats
// @access  Private
router.get('/stats',  async (req, res) => {
  try {
    // Get date for 7 days ago
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    // Find entries from the last 7 days
    const entries = await Entry.find({
      userId: req.user.id,
      date: { $gte: oneWeekAgo }
    });
    
    // Count occurrences of each mood
    const stats = {
      Happy: 0,
      Sad: 0,
      Angry: 0,
      Tired: 0,
      Calm: 0
    };
    
    entries.forEach(entry => {
      stats[entry.mood]++;
    });
    
    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/entries/ai-advice
// @desc    Get AI advice based on recent moods
// @access  Private
router.get('/ai-advice',  async (req, res) => {
  try {
    // Get 5 most recent entries
    const recentEntries = await Entry.find({ userId: req.user.id })
      .sort({ date: -1 })
      .limit(5);
    
    if (recentEntries.length === 0) {
      return res.json({ advice: "Start tracking your moods to get personalized advice!" });
    }
    
    // Format entries for OpenAI prompt
    const moodSummary = recentEntries.map(entry => 
      `${new Date(entry.date).toLocaleDateString()}: ${entry.mood}${entry.note ? ` - Note: ${entry.note}` : ''}`
    ).join('\n');
    
    // Generate advice using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful, empathetic wellness assistant. Provide brief, supportive advice based on the user's recent mood patterns."
        },
        {
          role: "user",
          content: `Here are my recent moods:\n${moodSummary}\n\nCan you give me some brief advice or encouragement based on these moods?`
        }
      ],
      max_tokens: 150
    });
    
    const advice = completion.choices[0].message.content;
    res.json({ advice });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;