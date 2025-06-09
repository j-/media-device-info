import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { type FC, useCallback, useState } from 'react';
import { ObjectView } from '../../ObjectView';
import { Link } from 'react-router';

const initGetSupportedConstraints = () =>
  navigator.mediaDevices.getSupportedConstraints();

export const RouteNavigatorMediaDevicesGetSupportedConstraints: FC = () => {
  const [supportedConstraints, setSupportedConstraints] = useState<
    MediaTrackSupportedConstraints | undefined
  >(initGetSupportedConstraints);

  return (
    <>
      <h1 style={{ fontSize: '1rem' }}>
        <code>navigator.mediaDevices.getSupportedConstraints()</code>
      </h1>

      <p>
        <Link to="/">&larr; Back</Link>
      </p>

      <Box m={1}>
        <Button
          type="button"
          onClick={() => setSupportedConstraints(undefined)}
          sx={{ textTransform: 'initial' }}
        >
          Clear
        </Button>

        <Button
          type="button"
          onClick={() => setSupportedConstraints(initGetSupportedConstraints)}
          sx={{ textTransform: 'initial' }}
        >
          <code>navigator.mediaDevices.getSupportedConstraints()</code>
        </Button>
      </Box>

      <Paper elevation={2} sx={{ m: 2, p: 2, overflow: 'auto' }}>
        <ObjectView value={supportedConstraints} />
      </Paper>
    </>
  );
};
