import { ComponentProps, useEffect, useRef, type FC } from 'react';

export type VideoStreamProps = ComponentProps<'video'> & {
  mediaStream: MediaStream | null;
};

export const VideoStream: FC<VideoStreamProps> = ({
  mediaStream,
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!mediaStream) return;
    const video = videoRef.current;
    if (!video) return;
    const videoTrack = mediaStream.getVideoTracks()[0];
    if (!videoTrack) return;
    video.srcObject = mediaStream;
    video.play();
  }, [mediaStream]);

  return <video ref={videoRef} autoPlay playsInline muted {...props} />;
};
