import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import styles from './index.module.scss';

interface Props {
  children: ReactNode;
  left?: number;
  top?: number;
  id: string;
  isSign?: boolean;
  isDisabled?: boolean;
  signed?: boolean;
}

export const ItemTypes = {
  TEXT: 'text',
  INITIALS: 'initials',
  SIGNATURE: 'signature',
  TEXTAREA: 'text_area'
};

const DragElement: FC<Props> = ({ children, left, top, id, isSign, signed, isDisabled }: Props) => {
  const [, drag] = useDrag(
    () => ({
      type: ItemTypes.TEXT,
      item: { id, left, top, signed },
      canDrag: true,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    [id, left, top, signed]
  );

  return (
    <div className={classNames(styles.draggable, isSign && styles.alt, signed && styles.signed, isDisabled && styles.disable)} style={{ left, top }} ref={drag}>
      {children}
    </div>
  );
};

DragElement.defaultProps = {
  left: 0,
  top: 0,
  isSign: false,
  isDisabled: false,
  signed: false
};

export default DragElement;

