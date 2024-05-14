import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ChatWebSocketContext = createContext(null);

export const ChatWebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws/chat');

        ws.onopen = () => {
            console.log("Connected to WebSocket");
            setSocket(ws);
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'llm_response') {
                setMessages(prevMessages => {
                    let updated = false;
                    const updatedMessages = prevMessages.map(message => {
                        if (message.type === 'llm_response' && !message.is_final) {
                            updated = true;
                            return {
                                ...message,
                                content: message.content + data.content,
                                is_final: data.is_final
                            };
                        }
                        return message;
                    });

                    if (!updated) {
                        updatedMessages.push(data);
                    }

                    return updatedMessages;
                });
            } else if (data.type !== 'heartbeat') {
                setMessages(prevMessages => [...prevMessages, data]);
            }
        };

        ws.onclose = () => console.log("Disconnected from WebSocket");
        ws.onerror = (error) => console.error("WebSocket error:", error);

        return () => {
            ws.close();
            console.log("WebSocket closed");
        };
    }, []);

    const sendMessage = useCallback((data) => {
        if (socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(data));
            if (data.action === "create") {
                setMessages(prevMessages => [...prevMessages, {
                    content: data.content,
                    user_id: data.user_id,
                    type: 'user_message',
                    is_final: true
                }]);
            }
        }
    }, [socket]);

    const setInitialMessages = useCallback((initialMessages) => {
        setMessages(initialMessages);
    }, []);

    return (
        <ChatWebSocketContext.Provider value={{ messages, sendMessage, setInitialMessages }}>
            {children}
        </ChatWebSocketContext.Provider>
    );
};

export const useChatWebSocket = () => useContext(ChatWebSocketContext);
