/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Separator } from '@moduix/react';

const sections = ['Personal details', 'Notifications'];

export function DecorativeSeparatorDemo() {
  return (
    <div className="card">
      <div className="stack">
        <span className="text">{sections[0]}</span>
        <Separator role="presentation" />
        <span className="text">{sections[1]}</span>
      </div>
    </div>
  );
}

//#endregion