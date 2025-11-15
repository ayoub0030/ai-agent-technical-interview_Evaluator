import { useEffect, useState, useRef } from 'react';

interface TranscriptionMessage {
  role: 'agent' | 'user';
  text: string;
  timestamp: number;
}

/**
 * Custom hook to capture real-time transcription from ElevenLabs conversation
 * Monitors the conversation object for message events
 */
export function useTranscription(conversation: any) {
  const [agentTranscription, setAgentTranscription] = useState<string>("");
  const [userTranscription, setUserTranscription] = useState<string>("");
  const messagesRef = useRef<TranscriptionMessage[]>([]);
  const lastAgentMessageRef = useRef<string>("");
  const lastUserMessageRef = useRef<string>("");

  useEffect(() => {
    if (!conversation) return;

    // Create a message handler that intercepts WebRTC messages
    const handleMessage = (event: any) => {
      console.log('[Transcription] Message event:', event);
      
      if (event.message) {
        const { role, text } = event.message;
        
        if (role === 'agent' && text && text !== lastAgentMessageRef.current) {
          console.log('[Transcription] Agent:', text);
          lastAgentMessageRef.current = text;
          setAgentTranscription(text);
        } else if (role === 'user' && text && text !== lastUserMessageRef.current) {
          console.log('[Transcription] User:', text);
          lastUserMessageRef.current = text;
          setUserTranscription(text);
        }
      }
    };

    // Try multiple approaches to attach listeners
    
    // Approach 1: Direct event listener on conversation object
    if (typeof (conversation as any).addEventListener === 'function') {
      (conversation as any).addEventListener('message', handleMessage);
      console.log('[Transcription] Attached via addEventListener');
    }
    
    // Approach 2: Using .on() method if available
    if (typeof (conversation as any).on === 'function') {
      (conversation as any).on('message', handleMessage);
      (conversation as any).on('agent_response', handleMessage);
      (conversation as any).on('user_message', handleMessage);
      console.log('[Transcription] Attached via .on()');
    }

    // Approach 3: Poll the conversation object for message history
    const pollInterval = setInterval(() => {
      // Check if conversation has a messages property
      if ((conversation as any).messages && Array.isArray((conversation as any).messages)) {
        const messages = (conversation as any).messages;
        if (messages.length > 0) {
          const lastMessage = messages[messages.length - 1];
          
          if (lastMessage.role === 'agent' && lastMessage.text !== lastAgentMessageRef.current) {
            console.log('[Transcription] Agent (from poll):', lastMessage.text);
            lastAgentMessageRef.current = lastMessage.text;
            setAgentTranscription(lastMessage.text);
          } else if (lastMessage.role === 'user' && lastMessage.text !== lastUserMessageRef.current) {
            console.log('[Transcription] User (from poll):', lastMessage.text);
            lastUserMessageRef.current = lastMessage.text;
            setUserTranscription(lastMessage.text);
          }
        }
      }
    }, 500);

    return () => {
      clearInterval(pollInterval);
      
      // Cleanup listeners
      if (typeof (conversation as any).removeEventListener === 'function') {
        (conversation as any).removeEventListener('message', handleMessage);
      }
      if (typeof (conversation as any).off === 'function') {
        (conversation as any).off('message', handleMessage);
        (conversation as any).off('agent_response', handleMessage);
        (conversation as any).off('user_message', handleMessage);
      }
    };
  }, [conversation]);

  return { agentTranscription, userTranscription };
}
