import { CloseButton } from '@moduix/react/close-button';
import { useState } from 'react';
import styles from '@/components/examples/close-button/close-button-basic.module.css';

export default function CloseButtonDemo() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <div data-preview-meta>
        <output>Notification dismissed</output>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <CloseButton
        aria-label="Dismiss notification"
        className={styles.closeButton}
        onClick={() => setIsVisible(false)}
      />
      <p className={styles.title}>Draft saved</p>
      <p className={styles.description}>The notification can be dismissed.</p>
    </div>
  );
}