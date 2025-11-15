import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { Canvas } from "@/features/system-design/components/Canvas";

interface SystemDesignInterviewProps {
  sendContextualUpdate?: (message: string) => void;
  agentTranscription?: string;
  userTranscription?: string;
  isSpeaking?: boolean;
}

const SystemDesignInterview: React.FC<SystemDesignInterviewProps> = ({ 
  sendContextualUpdate, 
  agentTranscription, 
  userTranscription, 
  isSpeaking 
}) => {
  return (
    <ReactFlowProvider>
      <Canvas 
        sendContextualUpdate={sendContextualUpdate}
        agentTranscription={agentTranscription}
        userTranscription={userTranscription}
        isSpeaking={isSpeaking}
      />
    </ReactFlowProvider>
  );
};

export default SystemDesignInterview;
