import type { TourStepDetails } from '@ark-ui/react/tour';
import { Button } from '@moduix/react/button';
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
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/tour/tour-events.module.css';

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
    <div className={styles.root}>
      <Tour tour={tour} lazyMount unmountOnExit>
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

      <PreviewMeta>
        <output>{result}</output>
        <Button onClick={() => tour.start()}>Start event tour</Button>
      </PreviewMeta>
    </div>
  );
}
