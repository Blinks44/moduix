//#region demo
import { CloseButton } from '@moduix/react';

export function CloseButtonDemo() {
  return (
    <div className="surface">
      <div className="content">
        <p className="title">Draft saved</p>
        <p className="description">The notification can be dismissed.</p>
      </div>
      <CloseButton aria-label="Dismiss notification" />
    </div>
  );
}
//#endregion