import { Button } from '@moduix/solid/button';
import { Dialog } from '@moduix/solid/dialog';
import { ScrollArea } from '@moduix/solid/scroll-area';
import styles from '@/components/examples/dialog/dialog-inside-scroll.module.css';

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
      <Dialog.Trigger asChild={(props) => <Button {...props()}>Open terms</Button>} />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Terms of service</Dialog.Title>
          <ScrollArea class={styles.scrollArea}>
            <ScrollArea.Viewport>
              <ScrollArea.Content>
                <div class={styles.content}>
                  {sections.map((section) => (
                    <section class={styles.section}>
                      <h3 class={styles.heading}>{section.title}</h3>
                      <p class={styles.paragraph}>{section.body}</p>
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
            <Dialog.CloseTrigger
              asChild={(props) => (
                <Button {...props()} variant="outline">
                  Close
                </Button>
              )}
            />
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}