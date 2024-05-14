// src/pages/ChatPage.jsx
import React, { useState, useEffect } from 'react';
import Toolbar from '../components/Toolbar';
import ChatArea from '../components/ChatArea';
import ChatSidebar from '../components/ChatSidebar';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useChatWebSocket } from '../contexts/ChatWebSocketProvider'; // Adjust the path as necessary

const ChatPage = () => {
    const theme = useTheme();
    const { sendMessage, messages, setInitialMessages } = useChatWebSocket();

    const [models, setModels] = useState({
        current: 1, // Set initial model ID
        options: ['GPT-3.5', 'GPT-4', 'GPT-3']
    });
    const [collections, setCollections] = useState({
        current: '',
        options: ['Collection 1', 'Collection 2', 'Collection 3']
    });

    const [selectedSession, setSelectedSession] = useState(null);

    const fetchMessages = (sessionId) => {
        fetch(`http://localhost:8000/api/chat_sessions/${sessionId}/messages`)
            .then(response => response.json())
            .then(data => {
                setInitialMessages(data); 
            })
            .catch(error => console.error(`Error fetching messages: `, error));
    };

    useEffect(() => {
        if (selectedSession !== null) {
            fetchMessages(selectedSession);
        }
    }, [selectedSession]);

    const handleNewChat = () => {
        fetch('http://localhost:8000/api/chat_sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        .then(response => response.json())
        .then(data => {
            setSelectedSession(data.id);
            setInitialMessages([]);
            setModels(prevModels => ({ ...prevModels, current: 1 })); // Reset model to default
        })
        .catch(error => console.error('Error creating new chat session: ', error));
    };

    const handleModelChange = (event) => {
        if (event && event.target) {
            setModels(prevModels => ({ ...prevModels, current: event.target.value }));
        }
    };

    const handleCollectionChange = (event) => {
        if (event && event.target) {
            setCollections(prevCollections => ({ ...prevCollections, current: event.target.value }));
        }
    };

    return (
        <Grid container spacing={0} sx={{ height: '98vh', overflow: 'hidden', display: 'flex', flexWrap: 'nowrap' }}>
            <Grid item sx={{ width: 250, minWidth: 250, maxWidth: 250, height: '100vh', display: 'flex', flexShrink: 0 }}>
                <ChatSidebar
                    onNewChat={handleNewChat}
                    onSelectSession={(sessionId) => {
                        setSelectedSession(sessionId);
                        setModels(prevModels => ({ ...prevModels, current: 1 })); // Reset model to default
                    }}
                />
            </Grid>
            <Grid item xs sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Toolbar
                    models={models}
                    collections={collections}
                    onModelChange={handleModelChange}
                    onDataCollectionChange={handleCollectionChange}
                />
                <ChatArea messages={messages} sendMessage={sendMessage} sessionId={selectedSession} />
            </Grid>
        </Grid>
    );
};

export default ChatPage;
