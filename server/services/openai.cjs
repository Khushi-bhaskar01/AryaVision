// openai.cjs
// const { OpenAI } = require('openai');

/**
 * @typedef {Object} MoodEntry
 * @property {string} mood
 * @property {string} [note]
 * @property {string} date
 */

/*
// Initialize OpenAI client only if API key exists
let openai = null;
if (process.env.OPENAI_API_KEY) {
  try {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  } catch (error) {
    console.warn('OpenAI client initialization failed:', error.message || 'Unknown error');
  }
}

/ **
 * Generates advice based on recent mood entries (uses fallback by default)
 * @param {MoodEntry[]} entries - Recent mood entries
 * @param {boolean} [useAPI=false] - Optionally force API usage
 * @returns {Promise<string>} Generated advice
 * /
async function generateAIAdvice(entries, useAPI = false) {
  // Default to fallback advice unless explicitly requesting API
  if (!useAPI || !openai || !process.env.OPENAI_API_KEY) {
    console.log('Using fallback advice (default behavior)');
    return getFallbackAdvice(entries);
  }
  
  try {
    const prompt = createPrompt(entries);
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      max_tokens: 100,
      temperature: 0.7,
    });
    return completion.choices[0]?.message?.content?.trim() || getFallbackAdvice(entries);
  } catch (error) {
    console.error('OpenAI API error, falling back to default advice:', error);
    return getFallbackAdvice(entries);
  }
}

/ **
 * Creates prompt for API (extracted for better organization)
 * @param {MoodEntry[]} entries
 * @returns {string}
 * /
function createPrompt(entries) {
  const moodSummary = entries.map(entry => ({
    mood: entry.mood,
    note: entry.note,
    date: new Date(entry.date).toLocaleDateString()
  }));
  
  return `
    Based on these mood entries, provide short, supportive advice (1-2 sentences):
    ${JSON.stringify(moodSummary, null, 2)}
    
    Provide personalized, positive, and actionable advice.
    Keep it concise (max 2 sentences) and uplifting.
  `;
}
*/

/**
 * Provides high-quality fallback advice
 * @param {MoodEntry[]} entries
 * @returns {string}
 */
function getFallbackAdvice(entries) {
  // Count mood occurrences
  const moodCounts = entries.reduce((counts, entry) => {
    counts[entry.mood] = (counts[entry.mood] || 0) + 1;
    return counts;
  }, {});

  // Get most frequent mood
  const mostFrequentMood = Object.entries(moodCounts).reduce(
    (max, [mood, count]) => count > max.count ? { mood, count } : max,
    { mood: 'calm', count: 0 }
  ).mood;

  // Enhanced advice library
  const adviceLibrary = {
    happy: [
      "Your positive energy is valuable - consider channeling it into a creative project.",
      "Share your happiness with someone who might need encouragement today."
    ],
    sad: [
      "Remember that feelings are temporary - be gentle with yourself.",
      "A short walk outside might help shift your perspective."
    ],
    angry: [
      "Try taking three deep breaths before responding to frustrating situations.",
      "Physical activity can help release angry energy in a healthy way."
    ],
    calm: [
      "Your calm mindset is a strength - use it to approach challenges thoughtfully.",
      "Consider journaling to reflect on what's contributing to your peaceful state."
    ],
    tired: [
      "Listen to your body's need for rest - even short breaks can help.",
      "Hydration and a quick stretch might help revive your energy."
    ],
    default: [
      "Reflect on what you need most right now and honor that need.",
      "Small acts of self-care can make a big difference in your day."
    ]
  };

  const adviceOptions = adviceLibrary[mostFrequentMood] || adviceLibrary.default;
  return adviceOptions[Math.floor(Math.random() * adviceOptions.length)];
}

/**
 * Modified generateAIAdvice to only use local advice
 * @param {MoodEntry[]} entries
 * @returns {Promise<string>}
 */
async function generateAIAdvice(entries) {
  console.log('Using local advice generation');
  return getFallbackAdvice(entries);
}

module.exports = {
  generateAIAdvice,
  getFallbackAdvice
};