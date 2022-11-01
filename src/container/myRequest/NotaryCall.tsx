/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from 'hooks/useAgora';
import UnmuteIcon from 'assets/icons/unmute-icon.png';
import MuteIcon from 'assets/icons/mute-icon.png';
import MediaPlayer from './MediaPlayer';
import styles from './index.module.scss';

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

interface Props {
  agoraToken?: any;
  id: string;
  agoraUid?: any;
  agoraUsers?: any;
}

/* eslint-disable-next-line */
const NotaryCall = forwardRef(({ agoraToken, id, agoraUid, agoraUsers }: Props, ref) => {
  const { localVideoTrack, leave, join, joinState, localAudioTrack, remoteUsers } = useAgora(client);

  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type: 'audio' | 'video') => {
    if (type === 'audio' && localAudioTrack) {
      await localAudioTrack.setEnabled(!trackState.audio);
      setTrackState((ps) => ({ ...ps, audio: !ps.audio }));
    } else if (type === 'video' && localVideoTrack) {
      await localVideoTrack.setEnabled(!trackState.video);
      setTrackState((ps) => ({ ...ps, video: !ps.video }));
    }
  };

  // eslint-disable-next-line no-param-reassign
  agoraUsers = agoraUsers && JSON.parse(agoraUsers);

  const participantList = Object.keys(agoraUsers).length;

  useImperativeHandle(ref, () => ({
    endSession() {
      leave();
    }
  }));

  // eslint-disable-next-line no-param-reassign
  agoraToken = agoraToken?.replace(/\s+/g, '+');

  useEffect(() => {
    join(process.env.REACT_APP_AGORA_APP_ID, id, agoraToken, parseInt(agoraUid, 10));

    return () => {
      leave();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <div className={participantList > 2 ? styles.video : styles.singleVideo}>
          <div>
            <div className={styles.caller_name}>
              <p className="local-player-text" style={{ color: 'blue', fontWeight: 600 }}>
                {joinState && localVideoTrack ? `${agoraUsers[agoraUid] && agoraUsers[agoraUid][0]}` : ''}
              </p>
              {joinState && localVideoTrack && (
                <button className={styles.microphone} onClick={() => mute('audio')}>
                  <div>
                    <img src={trackState.audio ? MuteIcon : UnmuteIcon} alt="" />
                  </div>
                </button>
              )}
            </div>
            <MediaPlayer videoTrack={localVideoTrack} audioTrack={undefined} />
          </div>
          {remoteUsers.map((user) => (
            <div className="remote-player-wrapper" key={user.uid}>
              <div className={styles.caller_name}>
                <p
                  className="remote-player-text"
                  style={agoraUsers[user.uid][1] === true ? { color: 'blue', fontWeight: 600 } : { color: 'black' }}
                >{`${agoraUsers[user.uid][0]}`}</p>
                <div className={styles.microphone}>
                  <img src={user.audioTrack ? MuteIcon : UnmuteIcon} alt="" />
                </div>
              </div>
              <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

NotaryCall.defaultProps = {
  agoraUid: null,
  agoraUsers: null,
  agoraToken: null
};

export default NotaryCall;

