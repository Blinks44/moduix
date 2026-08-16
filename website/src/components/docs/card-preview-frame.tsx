import type { ReactNode } from 'react';
import styles from './card-preview-frame.module.css';

function CardPreviewFrame({ children }: { children: ReactNode }) {
  return <div className={styles.frame}>{children}</div>;
}

export { CardPreviewFrame };