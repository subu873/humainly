import { useEffect, useState } from "react";
import { Message, NewChat } from "../../components";
import { API_BASE_URL } from "../../helper/envConstants";
import { useParams } from "react-router-dom";


const Chat = () => {
  const params = useParams();
  const THREAD_ID = params?.threadId || null
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [threadId, setThreadId] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [inputDisabled, setInputDisabled] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    setIsStreaming(true);
    setInputDisabled(true);

    // Add empty assistant message to fill blocks into
    setMessages(prev => [
      ...prev,
      { id: Date.now(), role: 'user', text: userMessage },
      { id: Date.now() + 1, role: 'assistant', blocks: [] }
    ]);

    try {
      const res = await fetch(`${API_BASE_URL}ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const block = JSON.parse(line);
            // Append each block to the last assistant message as it arrives
            setMessages(prev => {
              const updated = [...prev];
              const last = { ...updated[updated.length - 1] }; // ✅ new object
              last.blocks = [...(last.blocks || []), block];
              updated[updated.length - 1] = last;
              return updated;
            });
          } catch (e) {
            console.error('Malformed block:', line);
          }
        }
      }

    } catch (err) {
      console.error('Stream error:', err);
    } finally {
      setIsStreaming(false);
      setInputDisabled(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#121312]">
      {/* Main Content Area */}
      <div className="flex gap-2 w-full">


        {isNewMessage ? (
          <Message
            threadId={threadId}
            handleSendMessage={handleSendMessage}
            messages={messages}
            setMessage={setMessage}
            message={message}
            isStreaming={isStreaming}
            inputDisabled={inputDisabled} />
        ) : (
          <NewChat
            threadId={threadId}
            setIsNewMessage={setIsNewMessage}
            messages={messages}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage} />
        )}

      </div>
    </div>
  );
};

export default Chat;
