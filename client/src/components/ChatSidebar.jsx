// src/components/ChatSidebar.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Box, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
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

// Custom styled component for fading text
const FadingText = styled('div')(({ isTruncated }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  position: 'relative',
  display: 'inline-block',
  maxWidth: '100%',
  boxSizing: 'border-box',
  ...(isTruncated && {
    '&:after': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: '1.5em',
      background: 'linear-gradient(to right, rgba(42, 42, 42, 0), #2a2a2a)',
    },
  }),
}));

const ChatSidebar = ({ onNewChat, onSelectSession }) => {
  const [chatSessions, setChatSessions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [truncationStates, setTruncationStates] = useState({});

  useEffect(() => {
    fetch('http://localhost:8000/api/chat_sessions')
      .then(response => response.json())
      .then(data => {
        setChatSessions(data);
        const states = {};
        data.forEach(session => {
          const el = document.getElementById(`session-${session.id}`);
          if (el) {
            states[session.id] = el.scrollWidth > el.clientWidth;
          }
        });
        setTruncationStates(states);
      });
  }, []);

  const handleResize = useCallback(() => {
    const states = {};
    chatSessions.forEach(session => {
      const el = document.getElementById(`session-${session.id}`);
      if (el) {
        states[session.id] = el.scrollWidth > el.clientWidth;
      }
    });
    setTruncationStates(states);
  }, [chatSessions]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const filteredSessions = chatSessions.filter(session =>
    session.id.toString().includes(searchQuery)
  );

  return (
    <Box sx={{ width: '100%', p: 1, bgcolor: '#2a2a2a', boxSizing: 'border-box' }}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mb: 2, bgcolor: '#1a1a1a', color: 'white', '&:hover': { bgcolor: '#0a0a0a' } }}
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
          style={{ paddingLeft: '40px' }}
        />
      </Box>

      <List sx={{ color: 'white', width: '100%' }}>
        {filteredSessions.map(session => (
          <ListItem
            button
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            sx={{ width: '100%', boxSizing: 'border-box' }}
          >
            <ListItemText
              primary={
                <FadingText
                  id={`session-${session.id}`}
                  isTruncated={truncationStates[session.id]}
                >
                  {session.first_message_content}
                </FadingText>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatSidebar;
