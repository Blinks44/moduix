import { Button } from '@moduix/react/button';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/react/dialog';
import styles from '@/components/examples/dialog/dialog-outside-scroll.module.css';

const paragraphs = [
  'This release introduces a more resilient deployment workflow for teams that publish packages across several applications. Every release starts from a clean branch and records the exact commit, generated artifacts, and package version that will be published.',
  'Before publishing, review the changelog with the affected teams. Describe behavior changes, migration steps, and known limitations in language that a consumer can act on without reading the implementation.',
  'Run formatting, linting, unit tests, type checks, and production builds from the same commit. Treat a failed validation as a signal to stop the release rather than a step that can be skipped for speed.',
  'Verify package contents before uploading them. The published archive should include declarations, runtime files, licenses, and documentation entry points while excluding local fixtures and development-only source files.',
  'Install the candidate package in a clean consumer project. Exercise the documented imports, server-side rendering path, and one representative interaction so packaging errors are caught before a public release.',
  'Coordinate the release window with downstream maintainers when a change affects shared tokens, visual behavior, or form semantics. A short heads-up avoids unexpected updates during active product work.',
  'After publishing, confirm that the registry, documentation site, and package manager all expose the same version. Link the release notes to the relevant migration guidance when consumers need to take action.',
  'Monitor the first consumer reports and error dashboards. If a regression requires a patch, create a focused follow-up release with a clear explanation instead of silently replacing the published artifact.',
];

export default function DialogOutsideScrollDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open release notes</Button>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogPositioner className={styles.positioner}>
        <DialogContent className={styles.content}>
          <DialogHeader>
            <DialogTitle>Release notes</DialogTitle>
            <DialogDescription>
              The positioner scrolls the whole dialog when its content exceeds the viewport.
            </DialogDescription>
          </DialogHeader>
          <DialogBody className={styles.body}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </DialogBody>
          <DialogFooter>
            <DialogCloseTrigger asChild>
              <Button variant="outline">Close</Button>
            </DialogCloseTrigger>
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}