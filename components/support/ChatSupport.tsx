import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: string;
  status?: 'sending' | 'sent' | 'failed';
}

interface ChatSupportProps {
  isVisible: boolean;
  onClose: () => void;
  chatHistoryUrl?: string;
  sendMessageUrl?: string;
  bookingId?: string;
  title?: string;
  initialMessage?: string;
}

const ChatSupport: React.FC<ChatSupportProps> = ({
  isVisible,
  onClose,
  chatHistoryUrl,
  sendMessageUrl,
  bookingId,
  title = 'Support Chat',
  initialMessage,
}) => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history when component mounts or becomes visible
  useEffect(() => {
    if (isVisible) {
      loadChatHistory();
      // Add initial automated message if no messages exist
      if (messages.length === 0 && initialMessage) {
        const welcomeMessage: Message = {
          id: 'welcome-' + Date.now(),
          text: initialMessage,
          sender: 'support',
          timestamp: new Date().toISOString(),
        };
        setMessages([welcomeMessage]);
      }
    }
  }, [isVisible]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChatHistory = async () => {
    setIsLoadingHistory(true);
    try {
      // Mock data - replace with actual API call
      const mockMessages: Message[] = [
        {
          id: '1',
          text: 'Hello! How can I help you with your surgery booking today?',
          sender: 'support',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
      ];
      
      setMessages(mockMessages);
    } catch (error) {
      console.error('Failed to load chat history:', error);
      const errorMessage: Message = {
        id: 'error-' + Date.now(),
        text: 'Welcome to support chat. How can we help you today?',
        sender: 'support',
        timestamp: new Date().toISOString(),
      };
      setMessages([errorMessage]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isSending) return;

    const messageText = inputText.trim();
    const tempId = 'temp-' + Date.now();
    
    const userMessage: Message = {
      id: tempId,
      text: messageText,
      sender: 'user',
      timestamp: new Date().toISOString(),
      status: 'sending',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsSending(true);

    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessages(prev =>
        prev.map(msg =>
          msg.id === tempId ? {...msg, status: 'sent', id: 'msg-' + Date.now()} : msg
        )
      );

      // Mock support response
      setTimeout(() => {
        const supportResponse: Message = {
          id: 'support-' + Date.now(),
          text: `Thank you for your message: "${messageText}". A support representative will review your query and respond shortly.`,
          sender: 'support',
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, supportResponse]);
      }, 2000);

    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === tempId ? {...msg, status: 'failed'} : msg
        )
      );
    } finally {
      setIsSending(false);
    }
  };

  const retryMessage = (messageId: string) => {
    const failedMessage = messages.find(msg => msg.id === messageId);
    if (failedMessage) {
      setInputText(failedMessage.text);
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };

  const renderMessage = (message: Message) => {
    const isUser = message.sender === 'user';
    
    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
      >
        {!isUser && (
          <div className="flex items-end mr-2">
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">S</span>
            </div>
          </div>
        )}
        
        <div
          className={`max-w-[75%] rounded-xl p-3 ${
            isUser 
              ? 'bg-blue-500 text-white rounded-br-none' 
              : theme === 'dark' 
                ? 'bg-gray-700 text-white rounded-bl-none' 
                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
          }`}
        >
          <p className="text-sm">{message.text}</p>
          
          <div className="flex justify-between items-center mt-1">
            <span className={`text-xs ${
              isUser ? 'text-blue-100' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {formatTime(message.timestamp)}
            </span>
            
            {isUser && message.status && (
              <div className="ml-2">
                {message.status === 'sending' && (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {message.status === 'sent' && (
                  <span className="text-xs text-blue-100">✓</span>
                )}
                {message.status === 'failed' && (
                  <button 
                    onClick={() => retryMessage(message.id)}
                    className="text-xs text-red-300 hover:text-red-200"
                  >
                    Retry
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        
        {isUser && (
          <div className="flex items-end ml-2">
            <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">Y</span>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-8 right-8 w-96 h-[600px] flex flex-col rounded-xl shadow-xl overflow-hidden ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          {/* Header */}
          <div className={`flex justify-between items-center p-4 ${
            theme === 'dark' ? 'bg-teal-700' : 'bg-teal-500'
          }`}>
            <div>
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              {bookingId && (
                <p className="text-sm text-teal-100">Booking #{bookingId}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black bg-opacity-20 flex items-center justify-center text-white hover:bg-opacity-30 transition"
            >
              ×
            </button>
          </div>

          {/* Chat Messages */}
          <div className={`flex-1 overflow-y-auto p-4 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            {isLoadingHistory ? (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-3 text-gray-500 dark:text-gray-400">
                  Loading chat history...
                </p>
              </div>
            ) : (
              <>
                {messages.length > 0 ? (
                  messages.map(renderMessage)
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400 text-center">
                      Start a conversation with our support team
                    </p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className={`p-4 border-t ${
            theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}>
            <div className="flex items-end space-x-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className={`flex-1 p-3 rounded-lg resize-none max-h-32 min-h-[40px] focus:outline-none focus:ring-2 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-teal-500' 
                    : 'bg-gray-100 text-gray-800 placeholder-gray-500 focus:ring-teal-400'
                }`}
                rows={1}
                maxLength={500}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!inputText.trim() || isSending}
                className={`px-4 py-2 rounded-lg ${
                  (!inputText.trim() || isSending)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : theme === 'dark' 
                      ? 'bg-teal-600 hover:bg-teal-700' 
                      : 'bg-teal-500 hover:bg-teal-600'
                } text-white transition`}
              >
                {isSending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-2"></div>
                ) : (
                  'Send'
                )}
              </button>
            </div>
            <p className={`text-xs mt-1 text-right ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {inputText.length}/500
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatSupport;