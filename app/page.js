'use client'

import { Box, Button, Stack, TextField } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import SplineScene from './Splinescene'; // Import your Spline component

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);
    
    setMessage('');
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ]);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: 'black', color: 'white', position: 'relative' }} // Set position to relative for stacking context
    >
      <Stack
        direction={'row'} // Align chat and Spline scene horizontally
        spacing={4} // Space between chat and Spline scene
        width="100%"
        height="100%"
        justifyContent="flex-start" // Align chat to the left
        sx={{ position: 'relative', zIndex: 1 }} // Ensure chat has a higher z-index
      >
        <Stack
          direction={'column'}
          width="500px"
          height="700px"
          border="1px solid black"
          p={2}
          spacing={3}
          sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderColor: 'grey' }} // Set chat background to semi-transparent black
        >
          <Stack
            direction={'column'}
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={
                  message.role === 'assistant' ? 'flex-start' : 'flex-end'
                }
              >
                <Box
                  bgcolor={
                    message.role === 'assistant'
                      ? 'primary.main'
                      : 'secondary.main'
                  }
                  color="white" // Ensure message text is white
                  borderRadius={16}
                  p={3}
                >
                  {message.content}
                </Box>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Stack>
          <Stack direction={'row'} spacing={2}>
          <TextField
  label="Message"
  fullWidth
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  onKeyPress={handleKeyPress}
  disabled={isLoading}
  sx={{
    '& .MuiInputBase-input': { color: 'white' }, // Set text color
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'white' }, // Set border color
      '&:hover fieldset': { borderColor: 'white' }, // Set border color on hover
    },
    '& .MuiInputLabel-root': { color: 'white' }, // Set label color
    '& .MuiInputLabel-shrink': { color: 'white' } // Set label color when shrunk
  }}
/>

            <Button 
              variant="contained" 
              onClick={sendMessage}
              disabled={isLoading}
              sx={{ color: 'black', backgroundColor: 'white' }} // Set button colors
            >
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </Stack>
        </Stack>
        <Box flexGrow={1} /> {/* Add this Box to push the Spline scene to the right */}
        <SplineScene /> {/* Add the Spline scene here */}
      </Stack>
    </Box>
  );
}
