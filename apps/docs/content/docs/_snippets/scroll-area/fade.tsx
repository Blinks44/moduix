/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ScrollArea } from '@moduix/react';

const sections = [
  {
    title: 'Overview',
    body: "The mask becomes shallower near the top and bottom because it uses Ark's measured overflow distances.",
  },
  {
    title: 'Long content',
    body: 'Use it for settings panels, drawers, and release notes where scrollbar visibility alone is too subtle.',
  },
  {
    title: 'Tuning',
    body: 'Adjust --scroll-area-fade-size, --scroll-area-fade-start-size, and --scroll-area-fade-end-size on the root.',
  },
];

export function FadeScrollAreaDemo() {
  return (
    <ScrollArea className="root" fade>
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