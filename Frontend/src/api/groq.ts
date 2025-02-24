import axios from 'axios';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string | {
    type: 'text' | 'image_url';
    text?: string;
    image_url?: {
      url: string;
    };
  }[];
}

export interface ChatResponse {
  id: string;
  choices: {
    message: ChatMessage;
    finish_reason: string;
  }[];
}

class GroqAPI {
  private readonly headers = {
    'Authorization': `Bearer ${GROQ_API_KEY}`,
    'Content-Type': 'application/json',
  };

  async chat(messages: ChatMessage[]): Promise<ChatMessage> {
    try {
      const response = await axios.post<ChatResponse>(
        GROQ_API_URL,
        {
          model: "llama-3.2-11b-vision-preview",
          messages,
          temperature: 0.7,
          max_completion_tokens: 1024,
          top_p: 1,
          stream: false,
        },
        { headers: this.headers }
      );
      return response.data.choices[0].message;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Chat API error: ${error.response?.data?.error?.message || error.message}`);
      }
      throw error;
    }
  }

  async analyzeImage(imageUrl: string, query: string): Promise<string> {
    try {
      const response = await axios.post<ChatResponse>(
        GROQ_API_URL,
        {
          model: "llama-3.2-11b-vision-preview",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: query },
                { type: "image_url", image_url: { url: imageUrl } }
              ]
            }
          ],
          temperature: 0.7,
          max_completion_tokens: 1024,
        },
        { headers: this.headers }
      );
      return response.data.choices[0].message.content as string;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Image analysis error: ${error.response?.data?.error?.message || error.message}`);
      }
      throw error;
    }
  }
}

export const groqApi = new GroqAPI(); 