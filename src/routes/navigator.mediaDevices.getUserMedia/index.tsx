import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useEffect, useId, useMemo, useState, type FC } from 'react';
import { Link } from 'react-router';
import { ObjectView } from '../../ObjectView';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export const RouteNavigatorMediaDevicesGetUserMedia: FC = () => {
  const id = useId();

  const [countTracks, setCountTracks] = useState(0);
  const [requestAudio, setRequestAudio] = useState(false);
  const [requestVideo, setRequestVideo] = useState(false);
  const [facingMode, setFacingMode] = useState<VideoFacingModeEnum | ''>('');
  const [torch, setTorch] = useState(false);

  const audioConstraints = useMemo<MediaStreamConstraints['audio']>(() => {
    return requestAudio ? true : undefined;
  }, [requestAudio]);

  const videoConstraints = useMemo<MediaStreamConstraints['video']>(() => {
    if (!requestVideo) return undefined;
    const constraints: MediaTrackConstraints = {};
    if (facingMode) constraints.facingMode = facingMode;
    if (torch) (constraints as any).torch = torch;
    const hasConstraints = Object.keys(constraints).length > 0;
    return hasConstraints ? constraints : true;
  }, [requestVideo, facingMode, torch]);

  const mediaStreamConstraints = useMemo<MediaStreamConstraints>(() => {
    const mediaStreamConstraints: MediaStreamConstraints = {};

    if (audioConstraints) mediaStreamConstraints.audio = audioConstraints;
    if (videoConstraints) mediaStreamConstraints.video = videoConstraints;

    return mediaStreamConstraints;
  }, [audioConstraints, videoConstraints]);

  const [userMediaPromise, setUserMediaPromise] =
    useState<Promise<MediaStream>>();

  const [mediaStream, setMediaStream] = useState<MediaStream>();

  const tracks = useMemo(() => {
    if (!mediaStream) return undefined;
    return mediaStream.getTracks();
  }, [mediaStream]);

  useEffect(() => {
    if (!userMediaPromise) {
      setMediaStream(undefined);
      return;
    }
    userMediaPromise.then(setMediaStream);
  }, [userMediaPromise]);

  return (
    <>
      <h1 style={{ fontSize: '1rem' }}>
        <code>navigator.mediaDevices.getUserMedia()</code>
      </h1>

      <p>
        <Link to="/">&larr; Back</Link>
      </p>

      <h2>Constraints builder</h2>

      <Box>
        <FormControlLabel
          label={<code>audio</code>}
          control={
            <Checkbox
              checked={requestAudio}
              onChange={(e) => setRequestAudio(e.currentTarget.checked)}
            />
          }
        />
      </Box>

      <Box>
        <FormControlLabel
          label={<code>video</code>}
          control={
            <Checkbox
              checked={requestVideo}
              onChange={(e) => setRequestVideo(e.currentTarget.checked)}
            />
          }
        />
      </Box>

      {requestVideo ? (
        <Box component="fieldset" ml={7}>
          <Box my={2}>
            <FormControl sx={{ width: '16ch' }} size="small">
              <InputLabel id={`GetUserMedia-${id}-facingMode-label`}>
                <code>facingMode</code>
              </InputLabel>
              <Select
                labelId={`GetUserMedia-${id}-facingMode-label`}
                id={`GetUserMedia-${id}-facingMode`}
                value={facingMode}
                label={<code>facingMode</code>}
                onChange={(e) => {
                  setFacingMode(e.target.value as VideoFacingModeEnum);
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="user">
                  <code>user</code>
                </MenuItem>
                <MenuItem value="environment">
                  <code>environment</code>
                </MenuItem>
                <MenuItem value="left">
                  <code>left</code>
                </MenuItem>
                <MenuItem value="right">
                  <code>right</code>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <FormControlLabel
            label={<code>torch</code>}
            control={
              <Checkbox
                checked={torch}
                onChange={(e) => setTorch(e.currentTarget.checked)}
              />
            }
          />
        </Box>
      ) : null}

      <div>
        <Button
          type="button"
          onClick={() => {
            setUserMediaPromise(undefined);
          }}
          sx={{
            textTransform: 'initial',
            textAlign: 'left',
          }}
        >
          Clear
        </Button>
      </div>

      <div>
        <Button
          type="button"
          onClick={() => {
            if (mediaStream) {
              mediaStream.getTracks().forEach((track) => track.stop());
            }
            const promise = navigator.mediaDevices.getUserMedia(
              mediaStreamConstraints
            );
            setUserMediaPromise(promise);
          }}
          sx={{
            textTransform: 'initial',
            textAlign: 'left',
          }}
        >
          <pre style={{ margin: 0 }}>
            {'navigator.mediaDevices.getUserMedia('}
            {JSON.stringify(mediaStreamConstraints, null, 2)}
            {')'}
          </pre>
        </Button>
      </div>

      <Paper elevation={2} sx={{ m: 2, p: 2, overflow: 'auto' }}>
        <ObjectView value={userMediaPromise} />
      </Paper>

      {mediaStream == null ? null : (
        <>
          <h3>
            <code>mediaStream.getTracks()</code>
          </h3>

          <div>
            <Button
              type="button"
              onClick={() => {
                console.log(tracks);
              }}
              sx={{
                textTransform: 'initial',
                textAlign: 'left',
              }}
            >
              Log
            </Button>
          </div>

          <div>
            <Button
              type="button"
              onClick={() => {
                setCountTracks((countTracks) => countTracks + 1);
              }}
              sx={{
                textTransform: 'initial',
                textAlign: 'left',
              }}
            >
              Reload
            </Button>
          </div>

          <Paper elevation={2} sx={{ m: 2, p: 2, overflow: 'auto' }}>
            <ObjectView key={countTracks} value={tracks} />
          </Paper>
        </>
      )}
    </>
  );
};
