import { CloseButton } from '@moduix/react';

export default function CloseButtonDisabledDemo() {
  return (
    <CloseButton
      className="disabledCloseButton"
      aria-disabled="true"
      aria-label="Close unavailable message"
    />
  );
}