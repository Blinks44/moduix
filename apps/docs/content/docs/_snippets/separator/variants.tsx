/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Separator } from '@moduix/react';

const variants = ['solid', 'dashed', 'dotted'] as const;

export function SeparatorVariantsDemo() {
  return (
    <div className="section">
      {variants.map((variant) => (
        <div key={variant} className="exampleRow">
          <span className="text">{variant}</span>
          <Separator variant={variant} />
        </div>
      ))}
    </div>
  );
}

//#endregion