import React from 'react';
import Button from 'components/Button';

interface Props {
  startSession: Function;
}

const PreNotaryCall = ({ startSession }: Props) => (
  <div className="grid grid__layout mx-1">
    <div className="col-6 mr-2">
      <h3 className="text--600 mb-1">Let’s get your ready for your session while we setup your meeting room</h3>

      <ul className="lists mb-1">
        <li className="lists__item">
          Please make sure you are on a Desktop or Laptop with a webcam. You will be required to leave your video on throughout the session.
        </li>
        <li className="lists__item">
          When you are on the call identify the users on the call by calling their names and comparing the likeness of the image on their ID
          to the persons on the video call
        </li>
        <li className="lists__item">
          Here’s the meeting link “embedded in text”, click on Proceed to move into the meeting room and on (i) if you need help.
        </li>
      </ul>

      <h3 className="text--600 my-2">Remember to ask the following security questions</h3>

      <ul className="lists">
        <li className="lists__item">Do you understand the content of the document of the document you are about to notarize or Sign?</li>
        <li className="lists__item">Are you participating in today&#39;s notarization of your own free will?</li>
        <li className="lists__item">Do you agree to use an electronic signature to sign this document?</li>
        <li className="lists__item">
          Do you understand and agree that by signing this document you legally bind yourself to the terms of this document?
        </li>
      </ul>

      <hr className="mb-2" />

      <Button onClick={() => startSession(true)} className="px-3" size="md" theme="primary">
        Proceed
      </Button>
    </div>
  </div>
);

export default PreNotaryCall;
