// src/components/ChatArea.jsx

import React, { useState } from 'react';
import { Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Avatar, TextareaAutosize, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { styled } from '@mui/material/styles';
import { useChatWebSocket } from '../contexts/ChatWebSocketProvider'; 

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    outline: 'none',
    resize: 'none',
    boxShadow: theme.shadows[1],
    borderRadius: '4px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    '&:focus': {
        boxShadow: theme.shadows[3],
    }
}));

const SendButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.grey[500],
    '&:hover': {
        color: theme.palette.primary.main,
    }
}));

const ChatMessage = ({ message }) => {
    const isLLMResponse = message.type === "llm_response";
    const label = isLLMResponse ? "ChatGPT" : "You";

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar sx={{ marginRight: "-15px" }}>
                <Avatar sx={{ width: 24, height: 24, marginTop: "2px", color: "white" }}>
                    {isLLMResponse ? <SmartToyIcon /> : <PersonIcon />}
                </Avatar>
            </ListItemAvatar>
            <ListItemText 
                primary={
                    <>
                        <Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold', display: 'block' }}>
                            {label}
                        </Typography>
                        <Typography component="span" variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                            {message.content}
                        </Typography>
                    </>
                } 
                primaryTypographyProps={{ component: "div" }}
            />
        </ListItem>
    );
};

const ChatArea = ({ sessionId }) => {
    const { messages, sendMessage } = useChatWebSocket();
    const [input, setInput] = useState('');
    const [currentLLMId, setCurrentLLMId] = useState(1);  // Default to the first LLM

    const handleSend = () => {
        if (input.trim() && sessionId !== null) {
            const newMessage = {
                action: "create",
                content: input,
                user_id: 1,  // Default user_id to 1
                session_id: sessionId,  // Use the current session ID
                llm_id: currentLLMId,  // Send the current LLM ID
                type: "user_message" // Mark this message as a user message
            };
            sendMessage(newMessage);
            setInput('');  // Clear the input field after sending
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 64px)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <Box sx={{
                flexGrow: 1,
                overflowY: 'auto',
                padding: 2
            }}>
                <List>
                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                    ))}
                </List>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', margin: 'auto', padding: 2, mb: 1, width: '75%', borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
                <StyledTextarea
                    minRows={1}
                    maxRows={4}
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <SendButton onClick={handleSend}>
                    <SendIcon />
                </SendButton>
            </Box>
        </Box>
    );
};

export default ChatArea;
