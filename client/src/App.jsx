import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from './ThemeContext';
import MainLayout from './layouts/MainLayout';
import ChatPage from './pages/ChatPage'; // Ensure this is imported correctly
import SettingsPage from './pages/SettingsPage'; // Ensure this is imported correctly
// import HomePage from './pages/HomePage'; // Assuming you have a HomePage component
// import NotFoundPage from './pages/NotFoundPage'; // Assuming you have a NotFoundPage component
// import { WebSocketProvider } from './WebSocketContext';
import { ChatWebSocketProvider } from './contexts/ChatWebSocketProvider';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <ChatWebSocketProvider>
        <Router>
            <ThemeProvider>
                <MainLayout>
                    <Routes>
                        
                        <Route path="/chat" element={<ChatPage />} /> {/* Correctly closed Route for ChatPage */}
                        <Route path="/settings" element={<SettingsPage />} /> {/* Correctly closed Route for SettingsPage */}
                    </Routes>
                </MainLayout>
            </ThemeProvider>
        </Router>
    </ChatWebSocketProvider>
  );
}

export default App;
