import React, { useState, useEffect } from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel, Tooltip } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Toolbar = ({ onModelChange, onDataCollectionChange, models = {}, collections = {} }) => {
    const [selectedModel, setSelectedModel] = useState(models.current || '');
    const [selectedCollection, setSelectedCollection] = useState(collections.current || '');
    const [selectedTab, setSelectedTab] = useState('chat');

    useEffect(() => {
        if (selectedModel) {
            onModelChange(selectedModel);
        }
        if (selectedCollection) {
            onDataCollectionChange(selectedCollection);
        }
    }, [selectedModel, selectedCollection, onModelChange, onDataCollectionChange]);

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
    };

    const handleCollectionChange = (event) => {
        setSelectedCollection(event.target.value);
    };

    const handleTabChange = (event, newTab) => {
        if (newTab !== null) {
            setSelectedTab(newTab);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 0, backgroundColor: 'background.default' }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="model-select-label">Model</InputLabel>
                <Select
                    labelId="model-select-label"
                    id="model-select"
                    value={selectedModel}
                    onChange={handleModelChange}
                    label="Model"
                >
                    {(models.options || []).map((model) => (
                        <MenuItem key={model} value={model}>{model}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <ToggleButtonGroup
                value={selectedTab}
                exclusive
                onChange={handleTabChange}
                aria-label="toolbar tabs"
                sx={{ height: 30, mt: 2 }}
            >
                <Tooltip title="Chat" placement="top">
                    <ToggleButton value="chat" aria-label="chat">
                        <ChatIcon />
                    </ToggleButton>
                </Tooltip>
                <Tooltip title="Files Found" placement="top">
                    <ToggleButton value="files" aria-label="files found">
                        <FolderIcon />
                    </ToggleButton>
                </Tooltip>
                <Tooltip title="Prompt Configuration" placement="top">
                    <ToggleButton value="config" aria-label="prompt configuration">
                        <SettingsIcon />
                    </ToggleButton>
                </Tooltip>
            </ToggleButtonGroup>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="collection-select-label">Collection</InputLabel>
                <Select
                    labelId="collection-select-label"
                    id="collection-select"
                    value={selectedCollection}
                    onChange={handleCollectionChange}
                    label="Collection"
                >
                    {(collections.options || []).map((collection) => (
                        <MenuItem key={collection} value={collection}>{collection}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default Toolbar;
