import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { type FC, useEffect, useState } from 'react';
import { ObjectView } from '../../ObjectView';
import { Link } from 'react-router';

export const RouteNavigatorPermissionsQuery: FC = () => {
  const [count, setCount] = useState(0);

  const [permissionStatusPromise, setPermissionStatusPromise] = useState<
    Promise<PermissionStatus> | undefined
  >(() => {
    return navigator.permissions.query({
      name: 'camera' as PermissionName,
    });
  });

  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>();

  useEffect(() => {
    if (!permissionStatusPromise) return;
    permissionStatusPromise.then(setPermissionStatus);
  }, [permissionStatusPromise]);

  useEffect(() => {
    if (!permissionStatus) return;
    const handler = () => setCount((count) => count + 1);
    permissionStatus.addEventListener('change', handler);
    return () => permissionStatus.removeEventListener('change', handler);
  }, [permissionStatus]);

  return (
    <>
      <h1 style={{ fontSize: '1rem' }}>
        <code>navigator.permissions.query()</code>
      </h1>

      <p>
        <Link to="/">&larr; Back</Link>
      </p>

      <div>
        <Button
          type="button"
          onClick={() => setPermissionStatusPromise(undefined)}
          sx={{ textTransform: 'initial', textAlign: 'left' }}
        >
          Clear
        </Button>

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

      <Paper elevation={2} sx={{ m: 2, p: 2, overflow: 'auto' }}>
        <ObjectView key={count} value={permissionStatusPromise} />
      </Paper>
    </>
  );
};
