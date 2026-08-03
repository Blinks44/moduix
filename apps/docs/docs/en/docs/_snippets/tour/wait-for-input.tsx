import type { TourStepDetails } from '@ark-ui/react/tour';
import { Button } from '@moduix/react/button';
import { Input } from '@moduix/react/input';
import { Tour, useTour } from '@moduix/react/tour';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const steps = [
  {
    id: 'name',
    type: 'tooltip',
    title: 'Enter a name',
    description: 'The tour continues after at least two characters.',
    target: () => document.querySelector('#tour-wait-name') as HTMLInputElement | null,
    arrow: true,
  },
  {
    id: 'complete',
    type: 'dialog',
    title: 'Name saved',
    description: 'Typing two characters moved the tour to this step.',
    actions: [{ label: 'Done', action: 'dismiss' }],
    backdrop: true,
  },
] satisfies TourStepDetails[];

export default function TourWaitForInputDemo() {
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
      <Input
        id="tour-wait-name"
        aria-label="Workspace name"
        placeholder="Workspace name"
        onInput={(event) => {
          if (event.currentTarget.value.trim().length >= 2) {
            tour.next();
          }
        }}
      />

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
            </Tour.Body>
            <Tour.Control>
              <Tour.ActionList />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour>

      <PreviewMeta>
        <output>Tour: {status}</output>
        <Button onClick={() => tour.start()}>Start input tour</Button>
      </PreviewMeta>
    </div>
  );
}