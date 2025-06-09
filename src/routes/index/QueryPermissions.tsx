import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { ObjectView } from '../../ObjectView';

export const QueryPermissions = () => {
  const [permissionStatusPromise, setPermissionStatusPromise] =
    useState<Promise<PermissionStatus>>();

  const [devices, setDevices] = useState<MediaDeviceInfo[]>();

  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>();

  const [needsRefresh, setNeedsRefresh] = useState(false);

  useEffect(() => {
    const updateDevices = async () => {
      setDevices(await navigator.mediaDevices.enumerateDevices());
    };

    updateDevices();

    navigator.mediaDevices.addEventListener('devicechange', updateDevices);
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', updateDevices);
    };
  }, []);

  useEffect(() => {
    if (!permissionStatusPromise) return;
    permissionStatusPromise.then(setPermissionStatus);
  }, [permissionStatusPromise]);

  useEffect(() => {
    if (!permissionStatus) return;
    const handler = () => setNeedsRefresh(true);
    permissionStatus.addEventListener('change', handler);
    return () => permissionStatus.removeEventListener('change', handler);
  }, [permissionStatus]);

  return (
    <Paper elevation={2} sx={{ m: 2, p: 2, overflow: 'auto' }}>
      <div>
        <ObjectView value={navigator.permissions} />
      </div>

      <div>
        <Button
          type="button"
          onClick={() => {
            const promise = navigator.permissions.query({
              name: 'camera' as PermissionName,
            });
            setPermissionStatusPromise(promise);
          }}
          sx={{ textTransform: 'initial', textAlign: 'left' }}
        >
          <code>{'navigator.permissions.query({ name: "camera" })'}</code>
        </Button>
      </div>

      <div>
        <Button
          type="button"
          onClick={() => {
            const promise = navigator.permissions.query({
              name: 'video_capture' as PermissionName,
            });
            setPermissionStatusPromise(promise);
          }}
          sx={{ textTransform: 'initial', textAlign: 'left' }}
        >
          <code>
            {'navigator.permissions.query({ name: "video_capture" })'}
          </code>
        </Button>
      </div>

      {devices
        ? devices
            .filter((device) => device.deviceId != '')
            .map((device) => (
              <div key={`${device.kind}-${device.deviceId}`}>
                <Button
                  type="button"
                  onClick={() => {
                    const promise = navigator.permissions.query({
                      name: 'camera' as PermissionName,
                      deviceId: device.deviceId,
                    } as PermissionDescriptor);
                    setPermissionStatusPromise(promise);
                  }}
                  sx={{ textTransform: 'initial', textAlign: 'left' }}
                >
                  <pre style={{ margin: 0 }}>
                    {`navigator.permissions.query(${JSON.stringify(
                      { name: 'camera', deviceId: device.deviceId },
                      null,
                      2
                    )})`}
                  </pre>
                </Button>
              </div>
            ))
        : null}

      <div hidden>
        <Button
          type="button"
          variant={needsRefresh ? 'contained' : 'text'}
          onClick={() => {}}
          sx={{
            textTransform: 'initial',
            textAlign: 'left',
            display: 'inline-block',
          }}
        >
          Refresh
        </Button>
      </div>

      <Box m={1}>
        <ObjectView value={permissionStatusPromise} />
      </Box>
    </Paper>
  );
};
