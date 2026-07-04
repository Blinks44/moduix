/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ScrollArea } from '@moduix/react';

const sections = [
  {
    title: 'Outer release notes',
    body: 'The outer viewport can contain normal content and another complete ScrollArea tree.',
  },
  {
    title: 'Nested details',
    body: 'The nested root owns its own measurements, overflow state, and scrollbar parts.',
  },
];

export function NestedScrollAreaDemo() {
  return (
    <ScrollArea className="root">
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div className="textContent">
            <section>
              <h3>Outer release notes</h3>
              <p className="paragraph">{sections[0].body}</p>
            </section>
            <ScrollArea className="nestedRoot">
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