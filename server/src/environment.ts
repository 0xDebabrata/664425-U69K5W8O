import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY
export const GPT_CHAT_URL = 'https://api.openai.com/v1/chat/completions'