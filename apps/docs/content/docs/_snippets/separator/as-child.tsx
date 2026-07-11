/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Separator } from '@moduix/react';

const labels = ['Before native rule', 'After native rule'];

export function SeparatorAsChildDemo() {
  return (
    <div className="section">
      <span className="text">{labels[0]}</span>
      <Separator asChild>
        <hr className="nativeRule" />
      </Separator>
      <span className="text">{labels[1]}</span>
    </div>
  );
}

//#endregion