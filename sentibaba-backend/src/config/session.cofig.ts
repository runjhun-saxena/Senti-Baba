import axios from 'axios';

export const getGeminiResolution = async (stories: string[]): Promise<string> => {
const prompt = `
Two partners have shared their perspectives on a recent conflict:

Person A: "${stories[0]}"
Person B: "${stories[1]}"

You are a compassionate and unbiased relationship counselor.

Respond in **English** by default. If the users express themselves in **Hinglish**, adapt to that tone naturally.

Your reply must:
- Be within 150 words
- Use bullet points for clarity
- Focus on empathy and mutual understanding
- Suggest simple, actionable steps both can take
- Maintain a kind, non-judgmental, and constructive tone
- Avoid giving too much advice at once

**End your response with a question** that gently encourages reflection or next steps — for example:  
“Would you like me to suggest ways you can talk after this fight to improve communication?”

Do not take sides.
`;


  // Replace with your Gemini API URL or mock it
  const geminiApi = process.env.GEMINI_API_URL || 'https://dummy-resolver.net';

  try {
    const response = await axios.post(geminiApi, {
      prompt,
    });

    return response.data.resolution || 'Could not resolve the conflict.';
  } catch (err) {
    console.error('Gemini API failed:', err);
    return 'Sorry, we could not fetch a resolution at this time.';
  }
};
