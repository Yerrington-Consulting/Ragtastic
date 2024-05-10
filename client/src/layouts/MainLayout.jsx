import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Grid, Tooltip } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import LayersIcon from '@mui/icons-material/Layers';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'; // For the toggle button if needed

function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState('/chat');
  const navigate = useNavigate();

  const handleTabChange = (href) => {
    setActiveTab(href);
    navigate(href);
  };

  const toggleDrawer = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box sx={{ display: 'flex', overflowX: 'hidden', margin: -3 }}>
      <Drawer
        variant="permanent"
        onMouseOver={() => setCollapsed(false)}
        onMouseOut={() => setCollapsed(true)}
        sx={{
          width: collapsed ? 56 : 240,
          flexShrink: 0,
          top: 5,
          '& .MuiDrawer-paper': {
            width: collapsed ? 56 : 240,
            boxSizing: 'border-box',
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
          },
        }}
      >
        {/* <Toolbar /> */}
        {/* Image added here with aspect ratio maintenance and opacity adjustment */}
        <img
          src="./owl.png"
          alt="Owl Image"
          style={{
            width: '35px', // Ensures the image width matches the sidebar width
            //height: '20%', // Maintains the aspect ratio of the image
            objectFit: 'contain', // Ensures the image is scaled correctly within its content box
            marginLeft: 'auto', // Centers the image within the sidebar
            marginRight: 'auto', // Centers the image within the sidebar
            opacity: 0.35, // Sets the opacity to 50%
            marginTop: 10, // Adds some space above the image
            marginBottom: 10, // Adds some space below the image
          }}
          onMouseOver={() => console.log('Mouse over image')}
          onMouseOut={() => console.log('Mouse out of image')}
        />
        <List>
          {[{ icon: <ChatIcon />, text: "Chat", href: "/chat" },
            { icon: <LayersIcon />, text: "Collections", href: "/collections"},
            { icon: <SettingsIcon />, text: "Settings", href: "/settings" },
            { icon: <InfoIcon />, text: "About", href: "/about" }].map((item) => (
            <Tooltip title={collapsed ? item.text : ''} placement="right" key={item.href}>
              <ListItem
                button
                onClick={() => handleTabChange(item.href)}
                sx={{
                  bgcolor: activeTab === item.href ? 'rgba(0, 0, 255, 0.2)' : 'inherit',
                  borderLeft: activeTab === item.href ? '4px solid blue' : 'none',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {!collapsed && <ListItemText primary={item.text} />}
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default MainLayout;
