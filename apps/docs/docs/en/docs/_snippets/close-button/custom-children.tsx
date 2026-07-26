import { CloseButton } from '@moduix/react';

export default function CloseButtonCustomChildrenDemo() {
  return (
    <CloseButton aria-label="Close custom panel">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        stroke="currentColor"
        style={{ width: '1rem', height: '1rem' }}
      >
        <path d="m7 7 10 10" />
        <path d="m17 7-10 10" />
      </svg>
    </CloseButton>
  );
}