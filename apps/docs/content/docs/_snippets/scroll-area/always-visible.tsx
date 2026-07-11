/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ScrollArea } from '@moduix/react';

const sections = [
  {
    title: 'Always visible',
    body: 'Use the always variant when the scrollbar should remain available without waiting for hover or scrolling.',
  },
  {
    title: 'Native scrolling',
    body: 'The viewport still uses native wheel, touch, trackpad, and keyboard scrolling.',
  },
];

export function AlwaysVisibleScrollAreaDemo() {
  return (
    <ScrollArea className="root" variant="always">
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div className="textContent">
            {sections.map((item) => (
              <section key={item.title}>
                <h3>{item.title}</h3>
                <p className="paragraph">{item.body}</p>
              </section>
            ))}
          </div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  );
}

//#endregion