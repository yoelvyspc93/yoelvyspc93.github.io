'use client';

import { ReactNode } from 'react';
import styles from './Modal.module.scss';
import { CloseOutlineIcon } from '@/components/ui/Icons';

interface Props {
  isOpen: boolean;
  title: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, title, children }: Props) => {
  if (!isOpen) return null;

  return (
    <div className={`${styles.modal} modal`} data-blendy-to="modal-about">
      <div>
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>{title}</h2>
          <span className={styles.modal__close}>
            <CloseOutlineIcon />
          </span>
        </div>
        <div className={styles.modal__content}>{children}</div>
      </div>
    </div>
  );
};
