// src/components/ChatSidebar.jsx
import React, { useEffect, useState } from 'react';
import { Box, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Plus icon
import SearchIcon from '@mui/icons-material/Search'; // Import for the search icon
import { styled } from '@mui/material/styles';

// Custom styled InputBase for the search field
const DarkInput = styled('input')(({ theme }) => ({
  color: 'white',
  backgroundColor: '#333',
  border: 'none',
  padding: '8px',
  paddingLeft: '32px',
  borderRadius: theme.shape.borderRadius,
  fontSize: '0.875rem',
  width: 'calc(100% - 32px)', // Account for padding and icon
}));

const ChatSidebar = ({ onNewChat, onSelectSession }) => {
    const [chatSessions, setChatSessions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch('http://localhost:8000/api/chat_sessions')
            .then(response => response.json())
            .then(data => setChatSessions(data));
    }, []);

    const filteredSessions = chatSessions.filter(session =>
        session.id.toString().includes(searchQuery)
    );

    return (
        <Box sx={{ width: '100%', p: 1, bgcolor: '#2a2a2a' }}> {/* Slightly lighter background */}
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mb: 2, bgcolor: '#1a1a1a', color: 'white', '&:hover': { bgcolor: '#0a0a0a' } }} // Much darker button
                onClick={onNewChat}
                fullWidth
            >
                New Chat
            </Button>
            <Box sx={{ position: 'relative', mb: 2 }}>
                <IconButton sx={{ position: 'absolute', top: -2, left: 3, color: 'white' }}>
                    <SearchIcon />
                </IconButton>
                <DarkInput
                    placeholder="Search chats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ paddingLeft: '40px' }} // Room for the search icon
                />
            </Box>

            <List sx={{ color: 'white' }}>
                {filteredSessions.map(session => (
                    <ListItem button key={session.id} onClick={() => onSelectSession(session.id)}>
                        <ListItemText primary={`Session ${session.id}`} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ChatSidebar;
