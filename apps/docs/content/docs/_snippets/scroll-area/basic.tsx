/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ScrollArea } from '@moduix/react';

const sections = [
  {
    title: 'Overview',
    body: 'Use ScrollArea when content needs a bounded viewport without giving up native scrolling behavior.',
  },
  {
    title: 'Dense panels',
    body: 'Long settings forms, sidebars, drawers, and inspectors often need a stable frame with scrollable content inside.',
  },
  {
    title: 'Readable overflow',
    body: 'A visible scrollbar makes it clear that more content exists outside the current viewport.',
  },
  {
    title: 'Keyboard support',
    body: 'The viewport remains focusable, so keyboard scrolling works without extra wrapper logic.',
  },
];

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="root">
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