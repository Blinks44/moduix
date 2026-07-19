/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, ScrollArea } from '@moduix/react';

const sections = [
  {
    title: 'Overview',
    body: 'External controls can call the same scroll area API that Ark provides to the root provider.',
  },
  {
    title: 'Scroll targets',
    body: 'Use scrollToEdge for simple top and bottom controls, or the lower-level scroll methods for custom targets.',
  },
];

export function RootProviderScrollAreaDemo() {
  const scrollArea = ScrollArea.useScrollArea();
  return (
    <div className="providerStack">
      <div className="actions">
        <Button
          onClick={() =>
            scrollArea.scrollToEdge({
              edge: 'top',
            })
          }
        >
          Top
        </Button>
        <Button
          onClick={() =>
            scrollArea.scrollToEdge({
              edge: 'bottom',
            })
          }
        >
          Bottom
        </Button>
      </div>
      <ScrollArea.RootProvider value={scrollArea} className="root">
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
      </ScrollArea.RootProvider>
    </div>
  );
}

//#endregion