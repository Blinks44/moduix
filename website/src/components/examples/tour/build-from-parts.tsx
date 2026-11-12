import type { TourStepDetails } from '@ark-ui/react/tour';
import { Button } from '@moduix/react/button';
import { CloseButton } from '@moduix/react/close-button';
import { Stack } from '@moduix/react/stack';
import {
  Tour,
  TourBackdrop,
  TourSpotlight,
  TourPositioner,
  TourContent,
  TourTitle,
  TourDescription,
  TourProgressText,
  TourCloseTrigger,
  TourControl,
  TourActions,
  TourActionTrigger,
  useTour,
} from '@moduix/react/tour';
import { X as XIcon } from 'lucide-react';
import { useState } from 'react';
import styles from '@/components/examples/tour/tour-build-from-parts.module.css';

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
    target: () => document.querySelector('#tour-parts-upload') as HTMLElement | null,
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

export default function BuildFromPartsTourDemo() {
  const [status, setStatus] = useState('idle');
  const tour = useTour({
    steps,
    onStatusChange: (details) => setStatus(details.status),
  });

  return (
    <Stack align="center" gap="3">
      <Button id="tour-parts-upload" variant="outline">
        Upload files
      </Button>

      <Tour tour={tour}>
        <TourBackdrop />
        <TourSpotlight />
        <TourPositioner>
          <TourContent>
            <TourCloseTrigger asChild>
              <CloseButton aria-label="Close tour" className={styles.closeButton}>
                <XIcon strokeWidth={3} />
              </CloseButton>
            </TourCloseTrigger>
            <div className={styles.body}>
              <TourTitle />
              <TourDescription />
              <TourProgressText />
            </div>
            <TourControl>
              <TourActions>
                {(actions) =>
                  actions.map((action, index) => (
                    <TourActionTrigger key={`${action.label}-${index}`} action={action}>
                      {action.label}
                    </TourActionTrigger>
                  ))
                }
              </TourActions>
            </TourControl>
          </TourContent>
        </TourPositioner>
      </Tour>

      <div data-preview-meta>
        <output>Tour: {status}</output>
        <Button onClick={() => tour.start()}>Start tour</Button>
      </div>
    </Stack>
  );
}