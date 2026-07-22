import { Button, Dialog, ScrollArea } from '@moduix/react';

const sections = [
  {
    title: 'Prepare',
    body: 'Confirm the release branch and generated artifacts.',
  },
  {
    title: 'Validate',
    body: 'Run formatting, linting, builds, and type checks.',
  },
  {
    title: 'Publish',
    body: 'Publish only after every required validation succeeds.',
  },
];
export default function DialogScrollDemo() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Open terms</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner className="dialog-outside-positioner">
        <Dialog.Content className="dialog-inside-scroll">
          <Dialog.Title>Terms of service</Dialog.Title>
          <ScrollArea className="dialog-scroll-area">
            <ScrollArea.Viewport>
              <ScrollArea.Content>
                <div className="dialog-scroll-content">
                  {sections.map((section) => (
                    <section key={section.title}>
                      <h3>{section.title}</h3>
                      <p>{section.body}</p>
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
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}