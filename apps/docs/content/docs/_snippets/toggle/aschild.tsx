/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { CheckIcon, Toggle } from '@moduix/react';

export function AsChildToggleDemo() {
  return (
    <Toggle asChild variant="outline" defaultPressed>
      <button type="button">
        <CheckIcon />
        Save to favorites
      </button>
    </Toggle>
  );
}

//#endregion