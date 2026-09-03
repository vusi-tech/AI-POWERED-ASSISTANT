import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, User } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Disclaimer, FeatureHeader } from '@/components/ui/Shared';
import { generateChatResponse } from '@/lib/aiEngine';
import type { ChatMessage } from '@/types';

const suggestedPrompts = [
  'Help me write a professional email',
  'How can I improve my productivity?',
  'Summarize what you can do',
  'Tips for managing my tasks',
];

export function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm BUILD IT IA, your AI workplace productivity assistant. I can help you draft emails, summarize meetings, plan tasks, research topics, or answer any work-related questions. What can I help you with today?",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (text?: string) => {
    const message = (text ?? input).trim();
    if (!message || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: message, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await generateChatResponse(message);
    const aiMsg: ChatMessage = { role: 'assistant', content: response, timestamp: Date.now() };
    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="animate-fade-in">
      <FeatureHeader
        icon={<MessageSquare className="w-6 h-6" />}
        title="AI Chatbot Interface"
        description="Ask anything work-related and get instant, professional responses."
      />

      <Card className="overflow-hidden">
        {/* Chat area */}
        <div ref={scrollRef} className="h-[500px] overflow-y-auto scrollbar-thin px-4 sm:px-6 py-6 space-y-4 bg-slate-50/50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 animate-slide-up ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                msg.role === 'user'
                  ? 'bg-slate-900 text-white'
                  : 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>
              <div className={`max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`px-4 py-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-sm'
                    : 'bg-white text-slate-700 border border-slate-200 rounded-tl-sm shadow-sm'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
                <span className="text-xs text-slate-400 mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 animate-fade-in">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-600/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white border border-slate-200 rounded-tl-sm shadow-sm">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested prompts */}
        {messages.length <= 1 && (
          <div className="px-4 sm:px-6 py-3 border-t border-slate-100 bg-white">
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-2 rounded-lg text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200 hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-4 sm:px-6 py-4 border-t border-slate-100 bg-white">
          <div className="flex items-end gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-400 transition-all resize-none max-h-32"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-brand-600/20"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <Disclaimer className="mt-3" />
        </div>
      </Card>
    </div>
  );
}
