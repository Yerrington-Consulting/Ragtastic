import React, { useRef } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import EditIcon from '@mui/icons-material/Edit';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LayersIcon from '@mui/icons-material/Layers';

const Sidebar = ({ documents, collection, template, prompt }) => {
  const [value, setValue] = React.useState(0);
  const videoRef = useRef(null);  // Create a ref for the video element

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMouseOver = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseOut = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 1, fontSize: 12, height: '100vh' }}>
        <video
          ref={videoRef}
          src="/owl.mp4"
          width="100%" // Makes the video fit the width of the sidebar
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          muted  // Recommended to mute by default if autoplay or mouseover is used
          loop  // Optionally loop the video
          style={{ maxWidth: '100%' }} // Ensures the video is not wider than the sidebar
        />
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="sidebar tabs" 
          variant="scrollable" 
          scrollButtons="auto" 
          allowScrollButtonsMobile 
          sx={{ 
            pb: 2, 
            '.MuiTab-root': { 
              minWidth: 0, 
              padding: '6px' 
            }, 
            '.MuiSvgIcon-root': { 
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } // Responsive icon sizes
            } 
          }}
        >
            <Tab icon={<InsertDriveFileIcon />} aria-label="Documents" />
            <Tab icon={<LayersIcon />} aria-label="Collections" />
            <Tab icon={<EditIcon />} aria-label="Template" />
            <Tab icon={<QuestionAnswerIcon />} aria-label="Prompt" />
        </Tabs>
        <Box role="tabpanel" hidden={value !== 0}>
            <Box>{documents}</Box>
        </Box>
        <Box role="tabpanel" hidden={value !== 1}>
            <Box>{collection}</Box>
        </Box>
        <Box role="tabpanel" hidden={value !== 2}>
            <Box>{template}</Box>
        </Box>
        <Box role="tabpanel" hidden={value !== 3}>
            <Box>{prompt}</Box>
        </Box>
    </Box>
  );
};

export default Sidebar;
