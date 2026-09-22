import type { TourStepDetails } from '@ark-ui/solid/tour';
import { Button } from '@moduix/solid/button';
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
} from '@moduix/solid/tour';
import { createSignal } from 'solid-js';
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
  const [result, setResult] = createSignal('Status: idle');
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
    <div class={styles.root}>
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

      <output>{result()}</output>
      <Button onClick={() => tour().start()}>Start event tour</Button>
    </div>
  );
}