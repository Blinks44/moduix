import { CloseButton } from '@moduix/react/close-button';

function CircleXIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor">
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

export default function CloseButtonAsChildDemo() {
  return (
    <CloseButton asChild aria-label="Close composed panel">
      <button type="button">
        <CircleXIcon />
      </button>
    </CloseButton>
  );
}