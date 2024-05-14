// src/pages/ChatPage.jsx
import React, { useState, useEffect } from 'react';
import Toolbar from '../components/Toolbar';
import ChatArea from '../components/ChatArea';
import ChatSidebar from '../components/ChatSidebar';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // This is correct if you're using Material-UI's theme

const ChatPage = () => {
    const theme = useTheme();

    // State for models and collections
    const [models, setModels] = useState({
        current: 'GPT-4',
        options: ['GPT-3.5', 'GPT-4', 'GPT-3']
    });
    const [collections, setCollections] = useState({
        current: '',
        options: ['Collection 1', 'Collection 2', 'Collection 3']
    });

    // State for chat sessions and messages
    const [selectedSession, setSelectedSession] = useState(null);
    const [messages, setMessages] = useState([]);

    const fetchMessages = (sessionId) => {
        console.log(`Fetching messages for session: ${sessionId}`);
        fetch(`http://localhost:8000/api/chat_sessions/${sessionId}/messages`)
            .then(response => response.json())
            .then(data => {
                console.log(`Fetched messages: `, data);
                setMessages(data);
            })
            .catch(error => {
                console.error(`Error fetching messages: `, error);
            });
    };

    useEffect(() => {
        if (selectedSession !== null) {
            console.log(`Selected session changed: ${selectedSession}`);
            fetchMessages(selectedSession);
        }
    }, [selectedSession]);

    const handleNewChat = () => {
        console.log('Creating new chat session');
        fetch('http://localhost:8000/api/chat_sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        .then(response => response.json())
        .then(data => {
            console.log(`Created new chat session: ${data.id}`);
            setSelectedSession(data.id);
            setMessages([]);
        })
        .catch(error => {
            console.error('Error creating new chat session: ', error);
        });
    };

    const handleModelChange = (event) => {
        if (event && event.target) {
            console.log(`Model changed to: ${event.target.value}`);
            setModels(prevModels => ({ ...prevModels, current: event.target.value }));
        }
    };

    const handleCollectionChange = (event) => {
        if (event && event.target) {
            console.log(`Collection changed to: ${event.target.value}`);
            setCollections(prevCollections => ({ ...prevCollections, current: event.target.value }));
        }
    };

    return (
        <Grid container spacing={0} sx={{ height: '98vh', overflow: 'hidden', display: 'flex', flexWrap: 'nowrap' }}>
            <Grid item xs={2} sx={{ minWidth: 225, height: '100vh', display: 'flex' }}>
                <ChatSidebar
                    onNewChat={handleNewChat}
                    onSelectSession={setSelectedSession}
                />
            </Grid>
            <Grid item xs sx={{ flexGrow: 1, overflowY: 'hidden' }}>
                <Toolbar
                    models={models}
                    collections={collections}
                    onModelChange={handleModelChange}
                    onDataCollectionChange={handleCollectionChange}
                />
                <ChatArea messages={messages} />
            </Grid>
        </Grid>
    );
};

export default ChatPage;
