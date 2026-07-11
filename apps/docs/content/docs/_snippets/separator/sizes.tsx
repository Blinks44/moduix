/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Separator } from '@moduix/react';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;

export function SeparatorSizesDemo() {
  return (
    <div className="section">
      {sizes.map((size) => (
        <div key={size} className="exampleRow">
          <span className="text">{size}</span>
          <Separator size={size} />
        </div>
      ))}
    </div>
  );
}

//#endregion