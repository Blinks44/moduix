//#region demo
import { CloseButton } from '@moduix/react';

const _disabledDemo = {
  closeLabel: 'Close unavailable message',
  disabledState: 'aria-disabled',
};

export function CloseButtonDisabledDemo() {
  return (
    <CloseButton
      className="disabledCloseButton"
      aria-disabled="true"
      aria-label="Close unavailable message"
    />
  );
}
//#endregion