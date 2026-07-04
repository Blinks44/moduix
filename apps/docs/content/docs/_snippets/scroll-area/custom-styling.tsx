/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ScrollArea } from '@moduix/react';

const cells = Array.from(
  {
    length: 96,
  },
  (_, index) => index + 1,
);

export function CustomStylingScrollAreaDemo() {
  return (
    <ScrollArea className="customRoot">
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
      <ScrollArea.Scrollbar orientation="horizontal" className="accentScrollbar">
        <ScrollArea.Thumb className="accentThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="customCorner" />
    </ScrollArea>
  );
}

//#endregion