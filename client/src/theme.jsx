// src/theme.js
import { createTheme } from '@mui/material/styles';

// Function to generate theme details based on the mode
const getDesignTokens = (mode) => ({
    palette: {
        mode,  // Dynamically set 'dark' or 'light'
        primary: {
            main: mode === 'dark' ? '#90caf9' : '#1976d2',  // Example primary colors
        },
        secondary: {
            main: mode === 'dark' ? '#f48fb1' : '#dc004e',  // Example secondary colors
        },
        background: {
            default: mode === 'dark' ? '#181818' : '#fff',  // Background color
            paper: mode === 'dark' ? '#1f1f1f' : '#f5f5f5',  // Surface backgrounds
        },
    },
    typography: {
        // Define typography here if needed
    },
    // Add any other global overrides or custom components styling if necessary
});

// Function to create a theme instance based on the mode
const createCustomTheme = (mode = 'dark') => createTheme(getDesignTokens(mode));

export default createCustomTheme;
