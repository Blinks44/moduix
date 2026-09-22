import type { TourStepDetails } from '@ark-ui/solid/tour';
import { Button } from '@moduix/solid/button';
import {
  Tour,
  TourBackdrop,
  TourSpotlight,
  TourPositioner,
  TourContent,
  TourTitle,
  TourDescription,
  TourProgressText,
  TourBody,
  TourCloseIcon,
  TourControl,
  TourActionList,
  useTour,
} from '@moduix/solid/tour';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/tour/tour-basic.module.css';

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
    target: () => document.querySelector<HTMLElement>('#tour-basic-upload'),
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
    backdrop: true,
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
  const [status, setStatus] = createSignal('idle');
  const tour = useTour({
    steps,
    onStatusChange: (details) => setStatus(details.status),
  });

  return (
    <div class={styles.root}>
      <Button id="tour-basic-upload" variant="outline">
        Upload files
      </Button>

      <Tour tour={tour} lazyMount unmountOnExit>
        <TourBackdrop />
        <TourSpotlight />
        <TourPositioner>
          <TourContent>
            <TourCloseIcon />
            <TourBody>
              <TourTitle />
              <TourDescription />
              <TourProgressText />
            </TourBody>
            <TourControl>
              <TourActionList />
            </TourControl>
          </TourContent>
        </TourPositioner>
      </Tour>

      <output>Tour: {status()}</output>
      <Button onClick={() => tour().start()}>Start tour</Button>
    </div>
  );
}
