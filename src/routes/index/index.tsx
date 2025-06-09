import { Link } from 'react-router';
import { DisplayMedia } from './DisplayMedia';
import { RequestMedia } from './RequestMedia';

export const RouteIndex = () => (
  <>
    <h1>Media Device Info</h1>
    <p>Enumerate devices</p>
    <ul>
      <li>
        <Link to="/navigator.mediaDevices.enumerateDevices()">
          navigator.mediaDevices.enumerateDevices()
        </Link>
      </li>
      <li>
        <Link to="/navigator.mediaDevices.getSupportedConstraints()">
          navigator.mediaDevices.getSupportedConstraints()
        </Link>
      </li>
      <li>
        <Link to="/navigator.mediaDevices.getUserMedia()">
          navigator.mediaDevices.getUserMedia()
        </Link>
      </li>
      <li>
        <Link to="/navigator.permissions.query()">
          navigator.permissions.query()
        </Link>
      </li>
    </ul>

    <ul>
      <li>
        <Link to="/experiments/dual-camera">experiments/dual-camera</Link>
      </li>
    </ul>

    <DisplayMedia />
    <RequestMedia />
  </>
);
