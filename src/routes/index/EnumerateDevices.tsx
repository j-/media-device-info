import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useCallback, useState } from 'react';
import { ObjectView } from '../../ObjectView';

export const EnumerateDevices = () => {
  const [devicesPromise, setDevicesPromise] =
    useState<Promise<MediaDeviceInfo[]>>();

  const handleClickQueryMediaDeviceInfo = useCallback(() => {
    setDevicesPromise(navigator.mediaDevices.enumerateDevices());
  }, []);

  return (
    <Paper elevation={2} sx={{ m: 2, p: 2, overflow: 'auto' }}>
      <div>
        <ObjectView value={navigator.mediaDevices} />
      </div>

      <Button
        type="button"
        onClick={handleClickQueryMediaDeviceInfo}
      >
        <code>navigator.mediaDevices.enumerateDevices()</code>
      </Button>

      <Box m={1}>
        <ObjectView value={devicesPromise} />
      </Box>
    </Paper>
  );
};
