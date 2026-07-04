/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Kbd } from '@moduix/react';

const key = {
  label: 'Esc',
  title: 'Escape',
};

export function KbdAsChildDemo() {
  return (
    <Kbd asChild>
      <kbd title={key.title}>{key.label}</kbd>
    </Kbd>
  );
}

//#endregion