import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { ObjectView } from '../../ObjectView';

export const RequestMedia = () => {
  const [count, setCount] = useState(0);
  const rerender = useCallback(() => {
    setCount((count) => count + 1);
  }, []);

  const [userMediaPromise, setUserMediaPromise] =
    useState<Promise<MediaStream>>();

  const [mediaStream, setMediaStream] = useState<MediaStream>();

  const stop = useCallback((mediaStream: MediaStream) => {
    mediaStream.getTracks().forEach((track) => track.stop());
  }, []);

  const handleClickCloseMedia = useCallback(() => {
    if (!userMediaPromise) return;

    userMediaPromise
      .then((mediaStream) => mediaStream.getTracks())
      .then((tracks) => tracks.forEach((track) => track.stop()));
  }, [userMediaPromise]);

  const handleClickRerender = useCallback(() => {
    setCount((count) => count + 1);
  }, []);

  useEffect(() => {
    if (!userMediaPromise) {
      setMediaStream(undefined);
      return;
    }
    userMediaPromise.then(setMediaStream);
  }, [userMediaPromise]);

  useEffect(() => {
    if (!mediaStream) return;
    const handleEvent: EventListener = (e) => {
      rerender();
      enqueueSnackbar(`Media stream "${e.type}" event handled`, {
        autoHideDuration: 5_000,
      });
    };
    mediaStream.addEventListener('active', handleEvent);
    mediaStream.addEventListener('addtrack', handleEvent);
    mediaStream.addEventListener('inactive', handleEvent);
    mediaStream.addEventListener('removetrack', handleEvent);
    return () => {
      mediaStream.removeEventListener('active', handleEvent);
      mediaStream.removeEventListener('addtrack', handleEvent);
      mediaStream.removeEventListener('inactive', handleEvent);
      mediaStream.removeEventListener('removetrack', handleEvent);
    };
  }, [mediaStream, rerender]);

  useEffect(() => {
    if (!mediaStream) return;
    const tracks = mediaStream.getTracks();

    const callbacks = tracks.map((track) => {
      const handleEvent: EventListener = (e) => {
        rerender();
        enqueueSnackbar(
          `Media stream track (ID "${track.id}") "${e.type}" event handled`,
          { autoHideDuration: 5_000 }
        );
      };
      track.addEventListener('capturehandlechange', handleEvent);
      track.addEventListener('ended', handleEvent);
      track.addEventListener('mute', handleEvent);
      track.addEventListener('unmute', handleEvent);
      return () => {
        track.removeEventListener('capturehandlechange', handleEvent);
        track.removeEventListener('ended', handleEvent);
        track.removeEventListener('mute', handleEvent);
        track.removeEventListener('unmute', handleEvent);
      };
    });

    return () => {
      callbacks.forEach((callback) => callback());
    };
  }, [mediaStream, rerender]);

  return (
    <Paper elevation={2} sx={{ m: 2, p: 2, overflow: 'auto' }}>
      <Stack>
        <div>
          <Button
            type="button"
            onClick={async () => {
              if (userMediaPromise) userMediaPromise.then(stop);

              const promise = navigator.mediaDevices.getUserMedia({
                video: true,
              });

              setUserMediaPromise(promise);
            }}
            sx={{
              textTransform: 'initial',
              textAlign: 'left',
              display: 'inline-block',
            }}
          >
            <code>
              {'navigator.mediaDevices.getUserMedia({ video: true })'}
            </code>
          </Button>
        </div>

        {navigator.mediaDevices.getSupportedConstraints().facingMode
          ? [
              <div key="user">
                <Button
                  type="button"
                  onClick={async () => {
                    if (userMediaPromise) await userMediaPromise.then(stop);

                    const promise = navigator.mediaDevices.getUserMedia({
                      video: { facingMode: 'user' },
                    } as MediaStreamConstraints);

                    setUserMediaPromise(promise);
                  }}
                  sx={{
                    textTransform: 'initial',
                    textAlign: 'left',
                    display: 'inline-block',
                  }}
                >
                  <pre style={{ margin: 0 }}>
                    {`navigator.mediaDevices.getUserMedia(${JSON.stringify(
                      { video: { facingMode: 'user' } },
                      null,
                      2
                    )})`}
                  </pre>
                </Button>
              </div>,
              <div key="environment">
                <Button
                  type="button"
                  onClick={async () => {
                    if (userMediaPromise) await userMediaPromise.then(stop);

                    const promise = navigator.mediaDevices.getUserMedia({
                      video: { facingMode: 'environment' },
                    } as MediaStreamConstraints);

                    setUserMediaPromise(promise);
                  }}
                  sx={{
                    textTransform: 'initial',
                    textAlign: 'left',
                    display: 'inline-block',
                  }}
                >
                  <pre style={{ margin: 0 }}>
                    {`navigator.mediaDevices.getUserMedia(${JSON.stringify(
                      { video: { facingMode: 'environment' } },
                      null,
                      2
                    )})`}
                  </pre>
                </Button>
              </div>,
              <div key="left">
                <Button
                  type="button"
                  onClick={async () => {
                    if (userMediaPromise) await userMediaPromise.then(stop);

                    const promise = navigator.mediaDevices.getUserMedia({
                      video: { facingMode: 'left' },
                    } as MediaStreamConstraints);

                    setUserMediaPromise(promise);
                  }}
                  sx={{
                    textTransform: 'initial',
                    textAlign: 'left',
                    display: 'inline-block',
                  }}
                >
                  <pre style={{ margin: 0 }}>
                    {`navigator.mediaDevices.getUserMedia(${JSON.stringify(
                      { video: { facingMode: 'left' } },
                      null,
                      2
                    )})`}
                  </pre>
                </Button>
              </div>,
              <div key="right">
                <Button
                  type="button"
                  onClick={async () => {
                    if (userMediaPromise) await userMediaPromise.then(stop);

                    const promise = navigator.mediaDevices.getUserMedia({
                      video: { facingMode: 'right' },
                    } as MediaStreamConstraints);

                    setUserMediaPromise(promise);
                  }}
                  sx={{
                    textTransform: 'initial',
                    textAlign: 'left',
                    display: 'inline-block',
                  }}
                >
                  <pre style={{ margin: 0 }}>
                    {`navigator.mediaDevices.getUserMedia(${JSON.stringify(
                      { video: { facingMode: 'right' } },
                      null,
                      2
                    )})`}
                  </pre>
                </Button>
              </div>,
            ]
          : null}

        <div>
          <Button
            type="button"
            onClick={handleClickCloseMedia}
            sx={{
              textTransform: 'initial',
              textAlign: 'left',
              display: 'inline-block',
            }}
          >
            <code>
              {'mediaStream.getTracks().forEach((track) => track.stop())'}
            </code>
          </Button>
        </div>

        <div>
          <Button
            type="button"
            onClick={handleClickRerender}
            sx={{
              textTransform: 'initial',
              textAlign: 'left',
              display: 'inline-block',
            }}
          >
            Refresh
          </Button>
          <Button
            type="button"
            onClick={() => setUserMediaPromise(undefined)}
            sx={{
              textTransform: 'initial',
              textAlign: 'left',
              display: 'inline-block',
            }}
          >
            Clear
          </Button>
        </div>
      </Stack>

      <Box m={1}>
        <ObjectView key={count} value={userMediaPromise} />
      </Box>
    </Paper>
  );
};
