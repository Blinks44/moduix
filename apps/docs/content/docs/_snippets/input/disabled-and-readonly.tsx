/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Input } from '@moduix/react';

export function InputStatesDemo() {
  return (
    <div className="input-demo-stack">
      <Input disabled aria-label="Disabled input" placeholder="Disabled input" />
      <Input readOnly aria-label="Read-only workspace" value="Assigned workspace" />
    </div>
  );
}

//#endregion