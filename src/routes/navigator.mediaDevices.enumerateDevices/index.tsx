import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { type FC, useState } from 'react';
import { ObjectView } from '../../ObjectView';
import { Link } from 'react-router';

const initEnumerateDevices = async () => navigator.mediaDevices.enumerateDevices();

export const RouteNavigatorMediaDevicesEnumerateDevices: FC = () => {
  const [devicesPromise, setDevicesPromise] = useState<
    Promise<MediaDeviceInfo[]> | undefined
  >(initEnumerateDevices);

  return (
    <>
      <h1 style={{ fontSize: '1rem' }}>
        <code>navigator.mediaDevices.enumerateDevices()</code>
      </h1>

      <p>
        <Link to="/">&larr; Back</Link>
      </p>

      <Box m={1}>
        <Button
          type="button"
          onClick={() => setDevicesPromise(undefined)}
        >
          Clear
        </Button>

        <Button
          type="button"
          onClick={() => setDevicesPromise(initEnumerateDevices)}
        >
          <code>navigator.mediaDevices.enumerateDevices()</code>
        </Button>
      </Box>

      <Paper elevation={2} sx={{ m: 2, p: 2, overflow: 'auto' }}>
        <ObjectView value={devicesPromise} />
      </Paper>
    </>
  );
};
