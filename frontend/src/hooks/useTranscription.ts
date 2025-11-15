import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook to capture real-time transcription from ElevenLabs conversation
 * Uses the conversation object's internal message history
 */
export function useTranscription(conversation: any) {
  const [agentTranscription, setAgentTranscription] = useState<string>("");
  const [userTranscription, setUserTranscription] = useState<string>("");
  const lastAgentMessageRef = useRef<string>("");
  const lastUserMessageRef = useRef<string>("");

  useEffect(() => {
    if (!conversation) return;

    // Poll the conversation object for the latest messages
    // ElevenLabs stores messages in an internal state that we can access
    const pollInterval = setInterval(() => {
      try {
        // Try to access conversation messages through different possible properties
        let messages: any[] = [];
        
        // Check multiple possible properties where messages might be stored
        if ((conversation as any).messages && Array.isArray((conversation as any).messages)) {
          messages = (conversation as any).messages;
        } else if ((conversation as any).history && Array.isArray((conversation as any).history)) {
          messages = (conversation as any).history;
        } else if ((conversation as any).conversationHistory && Array.isArray((conversation as any).conversationHistory)) {
          messages = (conversation as any).conversationHistory;
        }

        if (messages.length > 0) {
          // Get the last few messages to find agent and user transcriptions
          for (let i = messages.length - 1; i >= Math.max(0, messages.length - 5); i--) {
            const msg = messages[i];
            
            // Check for agent message
            if ((msg.role === 'agent' || msg.type === 'agent_response') && msg.message) {
              const text = typeof msg.message === 'string' ? msg.message : msg.message.text || msg.message;
              if (text && text !== lastAgentMessageRef.current) {
                console.log('[Transcription] Agent:', text);
                lastAgentMessageRef.current = text;
                setAgentTranscription(text);
              }
            }
            
            // Check for user message
            if ((msg.role === 'user' || msg.type === 'user_message') && msg.message) {
              const text = typeof msg.message === 'string' ? msg.message : msg.message.text || msg.message;
              if (text && text !== lastUserMessageRef.current) {
                console.log('[Transcription] User:', text);
                lastUserMessageRef.current = text;
                setUserTranscription(text);
              }
            }
          }
        }
      } catch (error) {
        console.error('[Transcription] Error polling messages:', error);
      }
    }, 300); // Poll more frequently for real-time feel

    return () => {
      clearInterval(pollInterval);
    };
  }, [conversation]);

  return { agentTranscription, userTranscription };
}
