import { useCallback, useState, type FC } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { VideoStream } from './VideoStream';
import { Link } from 'react-router';

export const RouteExperimentsDualCamera: FC = () => {
  const [userMediaStream, setUserMediaStream] = useState<MediaStream | null>(null);
  const [environmentMediaStream, setEnvironmentMediaStream] = useState<MediaStream | null>(null);

  const handleClickRequestUserCamera = useCallback(async () => {
    try {
      const userMediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            exact: 'user',
          },
        },
      });
      setUserMediaStream(userMediaStream);
    } catch (err) {
      alert(`Failure: ${err}`);
    }
  }, []);

  const handleClickRequestEnvironmentCamera = useCallback(async () => {
    try {
      const environmentMediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            exact: 'environment',
          },
        },
      });
      setEnvironmentMediaStream(environmentMediaStream);
    } catch (err) {
      alert(`Failure: ${err}`);
    }
  }, []);

  return (
    <Stack>
      <p>
        <Link to="/">&larr; Back</Link>
      </p>

      <Button
        type="button"
        onClick={handleClickRequestUserCamera}
        disabled={userMediaStream != null}
      >
        Request user camera
      </Button>

      <Button
        type="button"
        onClick={handleClickRequestEnvironmentCamera}
        disabled={environmentMediaStream != null}
      >
        Request environment camera
      </Button>

      <VideoStream
        // props
        width={400}
        height={300}
        mediaStream={userMediaStream}
      />
      <VideoStream
        // props
        width={400}
        height={300}
        mediaStream={environmentMediaStream}
      />
    </Stack>
  );
};
