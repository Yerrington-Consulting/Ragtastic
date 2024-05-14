// client/src/components/Sidebar.jsx
import React, { useEffect, useState } from 'react';
import { Box, Button, List, ListItem, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const DarkInput = styled('input')(({ theme }) => ({
  color: 'white',
  backgroundColor: '#333',
  border: 'none',
  padding: '8px',
  paddingLeft: '32px',
  borderRadius: theme.shape.borderRadius,
  fontSize: '0.875rem',
  width: 'calc(100% - 32px)',
}));

function ChatSidebar({ onNewChat, onSelectSession }) {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/chat_sessions');
            setChats(response.data);
        } catch (error) {
            console.error('Failed to fetch chats:', error);
        }
    };

    const handleNewChat = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/chat_sessions');
            setChats([...chats, response.data]);
            onNewChat(response.data.id);  // Pass the new chat session ID to the parent component
        } catch (error) {
            console.error('Failed to create new chat:', error);
        }
    };

    return (
        <Box sx={{ width: '100%', p: 1, bgcolor: '#2a2a2a' }}>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mb: 2, bgcolor: '#1a1a1a', color: 'white', '&:hover': { bgcolor: '#0a0a0a' } }}
                onClick={handleNewChat}
                fullWidth
            >
                New Chat 213
            </Button>
            <Box sx={{ position: 'relative', mb: 2,  mr:2  }}>
                <IconButton sx={{ position: 'absolute', top: -2, left: 3, color: 'white' }}>
                    <SearchIcon />
                </IconButton>
                <DarkInput
                    placeholder="Search chats..."
                    style={{ paddingLeft: '40px' }}
                />
            </Box>
            <List sx={{ color: 'white' }}>
                {chats.map((chat) => (
                    <ListItem button key={chat.id} onClick={() => onSelectSession(chat.id)}>
                        hello..
                        {chat.id} {/* Displaying chat ID. Replace with chat.name if available */}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default ChatSidebar;
