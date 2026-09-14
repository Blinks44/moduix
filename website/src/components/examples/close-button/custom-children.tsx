import { CloseButton } from '@moduix/react/close-button';
import styles from '@/components/examples/close-button/close-button-custom-children.module.css';

export default function CloseButtonCustomChildrenDemo() {
  return (
    <CloseButton aria-label="Close custom panel">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        stroke="currentColor"
        className={styles.icon}
      >
        <path d="m7 7 10 10" />
        <path d="m17 7-10 10" />
      </svg>
    </CloseButton>
  );
}