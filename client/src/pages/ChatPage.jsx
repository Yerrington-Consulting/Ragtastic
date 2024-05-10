// src/pages/ChatPage.jsx
import React, { useState } from 'react';
import Toolbar from '../components/Toolbar';
import ChatArea from '../components/ChatArea';
import Sidebar from '../components/Sidebar';
import ChatSidebar from '../components/ChatSidebar';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // This is correct if you're using Material-UI's theme


const ChatPage = () => {
    const theme = useTheme(); // Example if you're using MUI's theme directly

    console.log("Theme is:", theme.palette.mode); // Logging to check theme mode

    // State for models and collections
    const [models, setModels] = useState({
        current: 'GPT-4',
        options: ['GPT-3.5', 'GPT-4', 'GPT-3']
    });
    const [collections, setCollections] = useState({
        current: '',
        options: ['Collection 1', 'Collection 2', 'Collection 3']
    });
    const handleModelChange = (event) => {
        console.log(event); // Check if event is defined and has the expected structure
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
        <Grid container spacing={0} sx={{ height: '98vh',  overflow: 'hidden', display: 'flex', flexWrap: 'nowrap' }}>
            <Grid item xs={2} sx={{ minWidth: 225, height: '100vh', display: 'flex' }}>
                <ChatSidebar
                    onNewChat={() => console.log('Start new chat')}
                />
            </Grid>
            <Grid item xs sx={{ flexGrow: 1, overflowY: 'hidden' }}>
            <Toolbar
                models={models}
                collections={collections}
                onModelChange={handleModelChange}
                onDataCollectionChange={handleCollectionChange}
            />
                <ChatArea />
            </Grid>
        </Grid>
    );
};

export default ChatPage;
