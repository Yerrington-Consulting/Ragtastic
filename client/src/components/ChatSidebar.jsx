// components/ChatSidebar.jsx
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Box, Button, List, ListItem, ListItemText, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/material/styles';

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editingSessionName, setEditingSessionName] = useState("");

  const textFieldRef = useRef(null);

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

  const handleContextMenuClick = (event, session) => {
    event.stopPropagation();
    console.log("Context menu clicked:", session);
    setAnchorEl(event.currentTarget);
    setSelectedSession(session);
  };

  const handleClose = () => {
    console.log("Menu closed");
    setAnchorEl(null);
    setSelectedSession(null);
  };

  const handleRename = () => {
    console.log("Rename clicked:", selectedSession);
    if (selectedSession) {
      console.log("Setting selectedSession.id in handleRename", selectedSession.id);
      setEditingSessionId(selectedSession.id);
      setEditingSessionName(selectedSession.first_message_content);
      handleClose();
    } else {
      console.error("No session selected for renaming");
    }
  };

  const handleRenameChange = (event) => {
    console.log("Rename input changed:", event.target.value);
    setEditingSessionName(event.target.value);
  };

  const handleRenameSubmit = (event) => {
    if (event.key === 'Enter') {
      console.log("Rename submitted:", editingSessionName);
      const updatedSessions = chatSessions.map(session =>
        session.id === editingSessionId
          ? { ...session, first_message_content: editingSessionName }
          : session
      );
      setChatSessions(updatedSessions);
      console.log("Setting setEditingSessionId to null in handleRenameSubmit");
      setEditingSessionId(null);
      textFieldRef.current.blur();
    }
  };

  const handleRenameBlur = () => {
    console.log("Rename input blurred");
    // Optionally, you can submit the rename or keep it as is.
    // handleRenameSubmit({ key: 'Enter' });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this chat session?")) {
      const updatedSessions = chatSessions.filter(session => session.id !== selectedSession.id);
      setChatSessions(updatedSessions);
    }
    handleClose();
  };

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
            onClick={() => {
              if (editingSessionId !== session.id) {
                onSelectSession(session.id);
              }
            }}
            sx={{ 
              width: '100%', 
              boxSizing: 'border-box', 
              position: 'relative',
              '&:hover .context-menu-icon': {
                visibility: 'visible',
              } 
            }}
          >
            { console.log("Rendering row", session.first_message_content)}
            { console.log("Current editID ", editingSessionId) }
            {editingSessionId === session.id ? (
              <TextField
                inputRef={textFieldRef}
                value={editingSessionName}
                onChange={handleRenameChange}
                onBlur={handleRenameBlur}
                onKeyPress={handleRenameSubmit}
                autoFocus
                fullWidth
                sx={{ 
                  '& .MuiInputBase-input': {
                    color: 'white',
                    padding: 0,
                  },
                  '& .MuiInput-underline:before, & .MuiInput-underline:after': {
                    borderBottom: 'none',
                  },
                }}
              />
            ) : (
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
            )}
            <IconButton
              className="context-menu-icon"
              sx={{ 
                position: 'absolute', 
                right: 0, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                visibility: 'hidden' 
              }}
              onClick={(event) => handleContextMenuClick(event, session)}
            >
              <MoreHorizIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleRename}>Rename</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default ChatSidebar;
