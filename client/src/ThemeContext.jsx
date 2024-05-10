// src/ThemeContext.js
import React, { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import createCustomTheme from './theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState('dark');  // Default theme mode

    const theme = useMemo(() => createCustomTheme(mode), [mode]);

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MUIThemeProvider theme={theme}>
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
