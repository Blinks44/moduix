/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Separator } from '@moduix/react';

const sections = ['Account settings', 'Billing details'];

export function SeparatorDemo() {
  return (
    <div className="card">
      <div className="stack">
        <span className="text">{sections[0]}</span>
        <Separator />
        <span className="text">{sections[1]}</span>
      </div>
    </div>
  );
}

//#endregion