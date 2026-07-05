/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Drawer, ScrollArea } from '@moduix/react';

const sections = [
  {
    title: 'Overview',
    body: 'Drawer content can scroll independently.',
  },
  {
    title: 'Details',
    body: 'The grabber and header remain visible.',
  },
];
const snapPoints = [0.18, 1];
export function ScrollableDrawerDemo() {
  return (
    <Drawer snapPoints={snapPoints} defaultSnapPoint={snapPoints[0]}>
      <Drawer.Trigger asChild>
        <Button>Open scrollable drawer</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Grabber>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Header>
            <Drawer.Title>Scrollable drawer</Drawer.Title>
            <Drawer.CloseIcon />
          </Drawer.Header>
          <Drawer.Body className="scroll-region">
            <ScrollArea className="scroll-area">
              <ScrollArea.Viewport className="scroll-viewport">
                <ScrollArea.Content className="scroll-body">
                  {sections.map((section) => (
                    <section key={section.title}>
                      <h3>{section.title}</h3>
                      <p>{section.body}</p>
                    </section>
                  ))}
                </ScrollArea.Content>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar>
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner />
            </ScrollArea>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}

//#endregion