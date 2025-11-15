# Closed Caption Transcription Debug Guide

## Overview
The closed caption feature captures real-time transcription from the ElevenLabs conversation and displays it at the bottom of the canvas during system design interviews.

## How It Works

### 1. **useTranscription Hook** (`frontend/src/hooks/useTranscription.ts`)
- Monitors the ElevenLabs conversation object for message events
- Uses three approaches to capture transcription:
  - **Event Listeners**: `.addEventListener()` and `.on()` methods
  - **Polling**: Checks `conversation.messages` array every 500ms
  - **Message Interception**: Captures message events from the conversation

### 2. **Data Flow**
```
ElevenLabs Conversation
    ↓
useTranscription Hook (captures messages)
    ↓
SystemDesignInterviewPage (stores in state)
    ↓
SystemDesignInterview (passes as props)
    ↓
Canvas Component (displays in closed caption bar)
```

### 3. **Canvas Closed Caption Bar**
- Located at the bottom of the canvas
- Shows AI interviewer transcription (sky-blue color)
- Shows user transcription (emerald color)
- Pulsing indicator when AI is speaking
- Responsive and non-intrusive layout

## Debugging Steps

### Step 1: Check Console Logs
Open browser DevTools (F12) and look for these logs:

```
[Transcription] Message event: {...}
[Transcription] Agent: "Your question about..."
[Transcription] User: "I would design it..."
[Canvas] Transcription received: { agent: "...", user: "...", isSpeaking: true }
```

### Step 2: Verify Data is Flowing
1. Start an interview
2. Open DevTools Console
3. Look for `[Transcription]` logs when AI speaks
4. Check if `[Canvas]` logs show the transcription data

### Step 3: Check Closed Caption Bar Visibility
1. If logs show transcription data but bar isn't visible:
   - Check if `agentTranscription` or `userTranscription` is empty string
   - Verify CSS is not hiding the element (check z-index, positioning)
   - Look for console errors in the Network tab

### Step 4: Inspect the Conversation Object
In browser console, run:
```javascript
// Check if conversation has messages
console.log('Conversation object:', window.conversation);
console.log('Has messages:', !!window.conversation?.messages);
console.log('Messages:', window.conversation?.messages);
```

## Expected Behavior

### When AI is Speaking:
- Closed caption bar appears at bottom of canvas
- Shows "AI Interviewer" label in sky-blue
- Displays the AI's spoken text
- Pulsing blue dot indicator

### When User is Speaking:
- Closed caption bar shows "You" label in emerald
- Displays the user's spoken text
- Static emerald dot indicator

### When No One is Speaking:
- Closed caption bar is hidden
- No visual clutter on the canvas

## Troubleshooting

### Issue: Closed Caption Bar Not Appearing
**Possible Causes:**
1. Transcription data not being captured from ElevenLabs
   - Check console for `[Transcription]` logs
   - Verify conversation object has messages property
   
2. Props not being passed correctly
   - Check `[Canvas] Transcription received:` logs
   - Verify `agentTranscription` and `userTranscription` are not empty
   
3. CSS/Display issue
   - Check if bar is hidden by other elements
   - Verify z-index is correct (should be visible above canvas)

### Issue: Transcription Data is Empty
**Solutions:**
1. Verify ElevenLabs API key is configured
2. Check if conversation is actually connected
3. Ensure microphone permissions are granted
4. Try speaking clearly and wait for transcription to process

### Issue: Only Partial Transcription Showing
**Solutions:**
1. Transcription is being updated in real-time
2. Wait for the complete sentence to be transcribed
3. Check if polling interval (500ms) is sufficient
4. May need to increase polling frequency if needed

## Testing Checklist

- [ ] Start interview and begin speaking
- [ ] Check console for `[Transcription]` logs
- [ ] Verify AI responds with transcription
- [ ] Check if closed caption bar appears
- [ ] Verify text is readable and properly formatted
- [ ] Check if speaker labels are correct (AI vs You)
- [ ] Verify pulsing indicator works when AI speaks
- [ ] Test with longer sentences
- [ ] Verify bar doesn't block diagram interaction

## Files Modified

1. **frontend/src/hooks/useTranscription.ts** (NEW)
   - Custom hook to capture transcription from ElevenLabs

2. **frontend/src/pages/Interview/SystemDesignInterviewPage.tsx**
   - Uses useTranscription hook
   - Passes transcription to SystemDesignInterview

3. **frontend/src/pages/Interview/SystemDesignInterview.tsx**
   - Accepts transcription props
   - Passes to Canvas component

4. **frontend/src/features/system-design/components/Canvas.tsx**
   - Displays closed caption bar
   - Shows agent and user transcription
   - Added debug logging

## Next Steps

If transcription is still not appearing:
1. Check ElevenLabs React library version and documentation
2. Verify conversation object structure in browser console
3. May need to implement alternative transcription capture method
4. Consider using ElevenLabs WebSocket API directly if needed
