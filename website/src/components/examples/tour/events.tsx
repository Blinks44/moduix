import type { TourStepDetails } from '@ark-ui/react/tour';
import { Button } from '@moduix/react/button';
import { Stack } from '@moduix/react/stack';
import {
  Tour,
  TourBackdrop,
  TourPositioner,
  TourContent,
  TourTitle,
  TourDescription,
  TourBody,
  TourCloseIcon,
  TourControl,
  TourActionList,
  useTour,
} from '@moduix/react/tour';
import { useState } from 'react';

const steps = [
  {
    id: 'overview',
    type: 'dialog',
    title: 'Project overview',
    description: 'Use Next to emit a step-change event.',
    actions: [{ label: 'Next', action: 'next' }],
    backdrop: true,
  },
  {
    id: 'complete',
    type: 'dialog',
    title: 'Events captured',
    description: 'Done emits the final status-change event.',
    actions: [{ label: 'Done', action: 'dismiss' }],
    backdrop: true,
  },
] satisfies TourStepDetails[];

export default function TourEventsDemo() {
  const [result, setResult] = useState('Status: idle');
  const tour = useTour({
    steps,
    onStepChange: (details) => {
      setResult(`Step changed: ${details.stepId}`);
    },
    onStatusChange: (details) => {
      setResult(`Status: ${details.status}`);
    },
  });

  return (
    <Stack align="center" gap="3">
      <Tour tour={tour}>
        <TourBackdrop />
        <TourPositioner>
          <TourContent>
            <TourCloseIcon />
            <TourBody>
              <TourTitle />
              <TourDescription />
            </TourBody>
            <TourControl>
              <TourActionList />
            </TourControl>
          </TourContent>
        </TourPositioner>
      </Tour>

      <div data-preview-meta>
        <output>{result}</output>
        <Button onClick={() => tour.start()}>Start event tour</Button>
      </div>
    </Stack>
  );
}