/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Input } from '@moduix/react';

export function InputSizesDemo() {
  return (
    <div className="input-demo-stack">
      <Input size="xs" aria-label="Extra-small input" placeholder="Extra-small input" />
      <Input size="sm" aria-label="Small input" placeholder="Small input" />
      <Input size="md" aria-label="Medium input" placeholder="Medium input" />
      <Input size="lg" aria-label="Large input" placeholder="Large input" />
      <Input size="xl" aria-label="Extra-large input" placeholder="Extra-large input" />
    </div>
  );
}

//#endregion