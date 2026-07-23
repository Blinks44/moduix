import { Button, Dialog, ScrollArea } from '@moduix/react';

const sections = [
  {
    title: 'Prepare',
    body: 'Confirm the release branch, generated artifacts, and versioned package metadata before starting the release.',
  },
  {
    title: 'Validate',
    body: 'Run formatting, linting, builds, and type checks. Resolve every failure before publishing an artifact.',
  },
  {
    title: 'Publish',
    body: 'Publish only after every required validation succeeds and the release notes accurately describe the changes.',
  },
  {
    title: 'Verify',
    body: 'Install the published package in a clean project and verify that the documented consumer path still works.',
  },
  {
    title: 'Communicate',
    body: 'Share the release with the team, include migration notes where needed, and monitor the first consumer reports.',
  },
];
export default function DialogScrollDemo() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Open terms</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
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
          <Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <Button variant="outline">Close</Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}