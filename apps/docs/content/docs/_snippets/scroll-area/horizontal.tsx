/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ScrollArea } from '@moduix/react';

const copy =
  'Long single-line or wide content can stay in one native scroll viewport while the custom horizontal track remains visible only when x-axis overflow exists.';

export function HorizontalScrollAreaDemo() {
  return (
    <ScrollArea className="horizontalRoot">
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <p className="wideParagraph">{copy}</p>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  );
}

//#endregion