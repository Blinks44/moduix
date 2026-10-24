import { CloseButton } from '@moduix/solid/close-button';

export default function CloseButtonCustomChildrenDemo() {
  return (
    <CloseButton aria-label="Close custom panel">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor">
        <path d="m7 7 10 10" />
        <path d="m17 7-10 10" />
      </svg>
    </CloseButton>
  );
}