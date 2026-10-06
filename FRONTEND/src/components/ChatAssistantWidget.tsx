import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Key,
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { aiChatService, type ChatMessage } from '../services/aiChatService';

export const ChatAssistantWidget: React.FC = () => {
  const { currentResult } = useAnalysis();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [geminiKeyInput, setGeminiKeyInput] = useState(aiChatService.getGeminiKey());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Hello! I'm your **ATS AI Career Assistant**. I'm synced with your active resume analysis. Ask me how to improve your score, rewrite experience bullets, or prep for interviews!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const quickPrompts = [
    'How can I improve my ATS score?',
    'Rewrite my experience bullets with metrics',
    'Why are these skills missing?',
    'Generate interview questions for this role',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const replyText = await aiChatService.generateResponse(messageText, messages, currentResult);
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Sorry, I encountered an issue processing your request. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSaveKey = () => {
    aiChatService.setGeminiKey(geminiKeyInput);
    setShowSettings(false);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'assistant',
        text: 'Chat history cleared. How can I assist you with your resume or job match?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-white font-semibold shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="Open AI Assistant"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-white animate-bounce-subtle" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
            </div>
            <span className="text-xs font-bold tracking-wide font-['Outfit'] pr-1">
              AI ATS Assistant
            </span>
          </button>
        )}
      </div>

      {/* Expandable Chat Drawer Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[600px] max-h-[85vh] flex flex-col rounded-3xl bg-[#090d1a]/95 border border-white/10 shadow-2xl shadow-cyan-950/80 backdrop-blur-2xl overflow-hidden animate-fade-in transition-all">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/10 bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white font-['Outfit']">ATS AI Assistant</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {currentResult?.jobTitle ? `${currentResult.jobTitle} • ${currentResult.overallScore}% Match` : 'Context Synced'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-400">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors ${
                  showSettings ? 'text-cyan-400 bg-white/10' : ''
                }`}
                title="API Key Settings"
              >
                <Key className="w-4 h-4" />
              </button>
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg hover:text-rose-400 hover:bg-white/5 transition-colors"
                title="Clear Chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
                title="Close Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Settings Modal Bar (Optional LLM Key) */}
          {showSettings && (
            <div className="p-4 bg-slate-900 border-b border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between font-semibold text-slate-200">
                <span>Connect Custom Google Gemini Key</span>
                <span className="text-[10px] text-emerald-400 font-mono">Optional</span>
              </div>
              <p className="text-[11px] text-slate-400">
                The assistant works offline out-of-the-box. Add your key for live generative AI responses.
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Paste Gemini API Key (AIzaSy...)"
                  value={geminiKeyInput}
                  onChange={(e) => setGeminiKeyInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:border-cyan-500 focus:outline-none"
                />
                <button
                  onClick={handleSaveKey}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-br-xs'
                      : 'bg-slate-900/90 border border-white/10 text-slate-200 rounded-bl-xs'
                  }`}
                >
                  <div
                    className="prose prose-invert prose-xs max-w-none space-y-2 whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html: msg.text
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/`([^`]+)`/g, '<code class="bg-black/30 px-1 py-0.5 rounded text-cyan-300">$1</code>')
                        .replace(/^### (.*$)/gim, '<h4 class="font-bold text-cyan-400 mt-2 mb-1">$1</h4>')
                        .replace(/^> (.*$)/gim, '<blockquote class="border-l-2 border-cyan-500 pl-2 text-slate-300 my-1 italic">$1</blockquote>'),
                    }}
                  />
                  <div
                    className={`text-[9px] mt-1.5 opacity-60 ${
                      msg.sender === 'user' ? 'text-right text-cyan-100' : 'text-left text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 items-center">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-white/10 text-slate-400 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping delay-100"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping delay-200"></span>
                  <span className="text-[11px] ml-1">Analyzing ATS context...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-4 py-2 bg-slate-900/40 border-t border-white/5 flex gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isTyping}
                className="px-2.5 py-1 rounded-full text-[10.5px] font-medium whitespace-nowrap bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 transition-all shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-slate-900/80 border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask how to improve your resume..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white disabled:opacity-40 hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
