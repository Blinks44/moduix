/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ScrollArea } from '@moduix/react';

const cells = Array.from(
  {
    length: 96,
  },
  (_, index) => index + 1,
);

export function BothDirectionsScrollAreaDemo() {
  return (
    <ScrollArea className="root">
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div className="gridContent">
            {cells.map((cell) => (
              <div key={cell} className="cell">
                {cell}
              </div>
            ))}
          </div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  );
}

//#endregion