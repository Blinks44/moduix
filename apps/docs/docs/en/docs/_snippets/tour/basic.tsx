import type { TourStepDetails } from '@ark-ui/react/tour';
import { Button } from '@moduix/react/button';
import { Tour, useTour } from '@moduix/react/tour';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const steps = [
  {
    id: 'welcome',
    type: 'dialog',
    title: 'Welcome to the workspace',
    description: 'Start with a dialog step, then move to a highlighted page control.',
    actions: [{ label: 'Start', action: 'next' }],
    backdrop: true,
  },
  {
    id: 'upload',
    type: 'tooltip',
    title: 'Upload files',
    description: 'Tooltip steps are anchored to target elements.',
    target: () => document.querySelector('#tour-basic-upload') as HTMLElement | null,
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
    backdrop: true,
    arrow: true,
  },
  {
    id: 'complete',
    type: 'floating',
    placement: 'bottom-end',
    title: 'You are ready',
    description: 'Floating steps stay in the viewport without a target.',
    actions: [{ label: 'Finish', action: 'dismiss' }],
  },
] satisfies TourStepDetails[];

export default function TourDemo() {
  const [status, setStatus] = useState('idle');
  const tour = useTour({
    steps,
    onStatusChange: (details) => setStatus(details.status),
  });

  return (
    <div
      style={{
        display: 'grid',
        gap: 'var(--moduix-spacing-3)',
        justifyItems: 'center',
      }}
    >
      <Button id="tour-basic-upload" variant="outline">
        Upload files
      </Button>

      <Tour tour={tour} lazyMount unmountOnExit>
        <Tour.Backdrop />
        <Tour.Spotlight />
        <Tour.Positioner>
          <Tour.Content>
            <Tour.Arrow />
            <Tour.CloseIcon />
            <Tour.Body>
              <Tour.Title />
              <Tour.Description />
              <Tour.ProgressText />
            </Tour.Body>
            <Tour.Control>
              <Tour.ActionList />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour>

      <PreviewMeta>
        <output>Tour: {status}</output>
        <Button onClick={() => tour.start()}>Start tour</Button>
      </PreviewMeta>
    </div>
  );
}