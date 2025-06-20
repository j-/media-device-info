import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { RouteIndex } from './routes/index';
import { RouteNavigatorMediaDevicesGetUserMedia } from './routes/navigator.mediaDevices.getUserMedia';
import { RouteNavigatorMediaDevicesGetSupportedConstraints } from './routes/navigator.mediaDevices.getSupportedConstraints';
import { RouteNavigatorMediaDevicesEnumerateDevices } from './routes/navigator.mediaDevices.enumerateDevices';
import { RouteNavigatorPermissionsQuery } from './routes/navigator.permissions.query';
import { RouteExperimentsDualCamera } from './routes/experiments/dual-camera';

const theme = createTheme({
  spacing: 4,
  typography: {
    fontSize: 12,
  },
  palette: {
    background: {
      default: 'hsla(200, 80%, 80%, 10%)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'initial',
          textAlign: 'left',
          userSelect: 'text',
        },
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <BrowserRouter basename="/media-device-info">
          <Routes>
            <Route
              path="/navigator.mediaDevices.enumerateDevices()"
              Component={RouteNavigatorMediaDevicesEnumerateDevices}
            />
            <Route
              path="/navigator.mediaDevices.getSupportedConstraints()"
              Component={RouteNavigatorMediaDevicesGetSupportedConstraints}
            />
            <Route
              path="/navigator.mediaDevices.getUserMedia()"
              Component={RouteNavigatorMediaDevicesGetUserMedia}
            />
            <Route
              path="/navigator.permissions.query()"
              Component={RouteNavigatorPermissionsQuery}
            />
            <Route
              path="/experiments/dual-camera"
              Component={RouteExperimentsDualCamera}
            />
            <Route path="/" Component={RouteIndex} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>
);
