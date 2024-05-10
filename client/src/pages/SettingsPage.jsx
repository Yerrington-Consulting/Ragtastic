import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Container } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const SettingsPage = () => {
    const [openAiApiKey, setOpenAiApiKey] = useState('');
    const [linkedinService, setLinkedinService] = useState('');

    const handleOpenAiApiKeyChange = (event) => {
        setOpenAiApiKey(event.target.value);
    };

    const handleLinkedinServiceChange = (event) => {
        setLinkedinService(event.target.value);
    };

    const handleSaveConfig = async () => {
        const config = {
            openAiApiKey,
            linkedinService,
        };

        try {
            const response = await fetch('/api/save-config', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(config)
            });
            const data = await response.json();
            alert('Config saved: ' + data.message);  // Assuming the API returns a message
        } catch (error) {
            console.error('Failed to save config', error);
            alert('Error saving config');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={4} mb={4}>
                <Typography variant="h4" gutterBottom>
                    Settings
                </Typography>
                <TextField
                    label="OpenAI API Key"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={openAiApiKey}
                    onChange={handleOpenAiApiKeyChange}
                />
                <TextField
                    label="LinkedIn Service"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={linkedinService}
                    onChange={handleLinkedinServiceChange}
                />
                <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color="primary"
                    onClick={handleSaveConfig}
                    sx={{ mt: 2 }}
                >
                    Save Config
                </Button>
            </Box>
        </Container>
    );
};

export default SettingsPage;
