import React from "react";
import { ReactComponent as BlueTick } from 'assets/icons/blueTick.svg';

interface Props {
  onClick: any;
  disabled: any;
  show?: any;
}

const EditButton = ({ show, onClick, disabled }: Props) => (
  show && <div className="flex flex__end" style={{ position: 'absolute', right: '10px' }}>
        <button className="flex flex__end" onClick={onClick} type="button" disabled={disabled}>
            <BlueTick />
            &nbsp;
            <span className="text--underline">Edit</span>
        </button>
    </div>
)

EditButton.defaultProps = {
  show: false
}

export default EditButton;
