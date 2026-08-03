import type { TourStepDetails } from '@ark-ui/react/tour';
import { Button } from '@moduix/react/button';
import { Tour, useTour } from '@moduix/react/tour';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const steps = [
  {
    id: 'custom-actions',
    type: 'dialog',
    title: 'Custom action labels',
    description: 'These buttons keep Ark behavior while changing their markup and copy.',
    actions: [
      { label: 'Continue', action: 'next' },
      { label: 'Skip tour', action: 'dismiss' },
    ],
    backdrop: true,
  },
  {
    id: 'finish',
    type: 'dialog',
    title: 'Same actions, different UI',
    description: 'Back and Finish still use their original Ark action objects.',
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Finish', action: 'dismiss' },
    ],
    backdrop: true,
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
              <Tour.Actions>
                {(actions) =>
                  actions.map((action, index) => (
                    <Tour.ActionTrigger key={`${action.label}-${index}`} action={action} asChild>
                      <Button variant={action.action === 'dismiss' ? 'outline' : 'default'}>
                        {action.label}
                      </Button>
                    </Tour.ActionTrigger>
                  ))
                }
              </Tour.Actions>
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour>

      <PreviewMeta>
        <output>Tour: {status}</output>
        <Button onClick={() => tour.start()}>Start custom tour</Button>
      </PreviewMeta>
    </div>
  );
}