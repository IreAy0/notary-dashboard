import React, { useRef, useEffect } from 'react';
import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack } from 'agora-rtc-sdk-ng';
import { useLocation } from 'react-router-dom';

export interface VideoPlayerProps {
  videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
}

const MediaPlayer = ({ videoTrack, audioTrack }: VideoPlayerProps) => {
  const { search } = useLocation();

  const container = useRef<HTMLDivElement>(null);
  const agoraUsers: any = new URLSearchParams(search).get('agoraUsers');

  const participant = JSON.parse(agoraUsers);

  const participantLength = Object.keys(participant).length;

  useEffect((): any => {
    if (!container.current) return '';
    videoTrack?.play(container.current);

    return () => {
      videoTrack?.stop();
    };
  }, [container, videoTrack]);

  useEffect(() => {
    if (audioTrack) {
      audioTrack?.play();
    }

    return () => {
      audioTrack?.stop();
    };
  }, [audioTrack]);

  return (
    <div
      ref={container}
      className="video-player"
      style={participantLength === 2 ? { width: '320px', height: '240px' } : { width: '130px', height: '130px' }}
    />
  );
};

export default MediaPlayer;

