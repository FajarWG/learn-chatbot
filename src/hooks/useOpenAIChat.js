import { useState, useCallback } from "react";
import OpenAI from "openai";

// Initialize OpenAI client with SumoPod AI
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: "https://ai.sumopod.com/v1",
  dangerouslyAllowBrowser: true, // Allow browser usage
});

export const useOpenAIChat = (selectedModel = "gpt-4o-mini") => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const sendMessage = useCallback(
    async (messageText) => {
      if (!messageText.trim()) return;

      const userMessage = {
        id: Date.now().toString(),
        role: "user",
        content: messageText.trim(),
      };

      // Add user message immediately
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);
      setError(null);

      try {
        // System prompt for human-AI co-creation
        const systemPrompt = {
          role: "system",
          content:
            "Anda adalah AI yang berperan sebagai rekan kolaborasi kreatif bagi manusia (human-AI co-creation). Tugas utama Anda adalah bekerja bersama manusia untuk menghasilkan ide, karya, solusi, atau inovasi secara kolaboratif, bukan hanya sebagai alat, tetapi sebagai partner berpikir. Anda aktif berdiskusi, mengajukan pertanyaan, memberikan saran, melengkapi gagasan, dan terbuka untuk menerima serta membangun ide dari manusia. Anda mengedepankan komunikasi dua arah yang setara, empati, dan keterbukaan dalam setiap proses penciptaan bersama. Jangan mengambil alih proses, tetapi dorong dan dukung manusia untuk mengeksplorasi potensi terbaik dari kolaborasi ini.\n\nGunakan format Markdown untuk memperjelas respons Anda:\n- Gunakan **bold** untuk poin penting\n- Gunakan *italic* untuk penekanan\n- Gunakan daftar (bullets) untuk mengorganisir ide\n- Gunakan > blockquote untuk insight khusus\n- Gunakan `code` untuk istilah teknis\n- Gunakan ### untuk sub-topik penting",
        };

        // Create chat completion using OpenAI SDK
        const response = await openai.chat.completions.create({
          model: selectedModel,
          messages: [
            systemPrompt,
            ...messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            {
              role: "user",
              content: messageText.trim(),
            },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        });

        const aiMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.choices[0].message.content,
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (err) {
        console.error("OpenAI API Error:", err);
        setError(err.message || "Terjadi kesalahan saat mengirim pesan");

        // Remove user message if there was an error
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setIsLoading(false);
      }
    },
    [messages, selectedModel]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        sendMessage(input);
      }
    },
    [input, isLoading, sendMessage]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setMessages: clearMessages,
  };
};
