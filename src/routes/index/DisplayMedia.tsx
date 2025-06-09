import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useCallback, useState } from 'react';
import { ObjectView } from '../../ObjectView';

export const DisplayMedia = () => {
  const [mediaStream, setMediaStream] = useState<Promise<MediaStream>>();

  const handleClickGetDisplayMedia = useCallback(() => {
    setMediaStream(navigator.mediaDevices.getDisplayMedia());
  }, []);

  return (
    <Paper elevation={2} sx={{ m: 2, p: 2, overflow: 'auto' }}>
      <Button
        type="button"
        onClick={handleClickGetDisplayMedia}
      >
        <code>navigator.mediaDevices.getDisplayMedia()</code>
      </Button>

      <Box m={1}>
        <ObjectView value={mediaStream} />
      </Box>
    </Paper>
  );
};
