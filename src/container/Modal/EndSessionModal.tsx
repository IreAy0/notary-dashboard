import Button from "components/Button";
import Modal from "components/Modal/Modal";
import Select from "components/Select";
import React, { useEffect, useState} from "react";
import styles from './sessionmodal.module.scss';
import Cancel from '../../assets/icons/close-icon.svg';

interface Props {
  isOpen: boolean;
  isClose: () => void,
  endSessionNote: any;
  onClick: () => void
}

const EndSessionModal = ({ isOpen, isClose, endSessionNote, onClick }: Props) => {
  const [selected, setSelected] = useState<any>({});
  const [otherReasons, setOtherReasons] = useState<any>();

  const options = [
    {
      name: "All participants  didn’t join the call",
      id: 1
    },
    {
      name: "No one joined the call",
      id: 2
    },
    {
      name: "Wrong document",
      id: 3
    },
    {
      name: "Mistake with the document",
      id: 4
    },
    {
      name: "Notice a fraudulent act",
      id: 5
    },
    {
      name: "Others",
      id: 6
    }
  ]

  useEffect(() => {
    endSessionNote(selected.name !== "Others" ? selected?.name : otherReasons)
  }, [selected, otherReasons, endSessionNote])

  const handleChange = (e:any) => {
    setOtherReasons(e.target.value)
  }

  return(
    <Modal isOpen={isOpen} isClose={isClose} width={600}>
      <div className={styles.close_icon}>
        <img src={Cancel} alt="" onClick={isClose} aria-hidden/>
      </div>
      <div className={styles.container}>
          <div className={styles.content}>
            <h3 className={styles.content__header}>Why do you want to cancel session?</h3>
            <p className={styles.content__caption}>Kindly choose from the options</p>
            <div className={styles.content__select}>
                <Select label="Reason" selected={selected} handleChange={setSelected} options={options} />
            </div>
             {selected?.name === "Others" ? <div className={styles.content__note}>
              <p>Description</p>
              <textarea onChange={(e:any) => handleChange(e)} />
            </div> : null}
          </div>
          <div className={styles.container__button}>
            <Button theme="primary" size="md" width={100} onClick={onClick}>Submit</Button>
          </div>
      </div>
    </Modal>
  )
}

export default EndSessionModal;
