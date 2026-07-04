//#region demo
import { CloseButton } from '@moduix/react';

const _asChildDemo = {
  closeLabel: 'Close composed panel',
  childElement: 'button',
};

function CircleXIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor">
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

export function CloseButtonAsChildDemo() {
  return (
    <CloseButton asChild className="asChildButton" aria-label="Close composed panel">
      <button>
        <CircleXIcon />
      </button>
    </CloseButton>
  );
}
//#endregion