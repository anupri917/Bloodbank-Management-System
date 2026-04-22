import React, { useState } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: 'Hi! I am the BloodBank AI. How can I help you today?', isBot: true }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/v1/chatbot/ask', { query: userMessage.text });
      setMessages((prev) => [...prev, { text: response.data.answer, isBot: true }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: 'Sorry, I am having trouble connecting to the server.', isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button 
          className="btn-primary"
          style={{ position: 'fixed', bottom: '2rem', right: '2rem', borderRadius: '50%', width: '60px', height: '60px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, boxShadow: '0 8px 32px rgba(255, 75, 75, 0.4)' }}
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="glass animate-fade-in" style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: '350px', height: '500px', zIndex: 1000, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ background: 'var(--primary)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageCircle size={20} /> <strong>AI Assistant</strong>
            </div>
            <button style={{ background: 'none', border: 'none', color: 'white', padding: 0 }} onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ alignSelf: msg.isBot ? 'flex-start' : 'flex-end', background: msg.isBot ? 'rgba(255,255,255,0.1)' : 'var(--primary)', padding: '10px 14px', borderRadius: '12px', maxWidth: '85%', borderBottomLeftRadius: msg.isBot ? '2px' : '12px', borderBottomRightRadius: !msg.isBot ? '2px' : '12px' }}>
                {msg.text}
              </div>
            ))}
            {isLoading && <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '12px', fontStyle: 'italic', fontSize: '0.9rem' }}>Typing...</div>}
          </div>

          <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="Ask a question..." 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              style={{ background: 'rgba(0,0,0,0.2)' }}
            />
            <button className="btn-primary" style={{ padding: '0 1rem' }} onClick={sendMessage}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
