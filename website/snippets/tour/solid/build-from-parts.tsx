import type { TourStepDetails } from '@ark-ui/solid/tour';
import { Button } from '@moduix/solid/button';
import { CloseButton } from '@moduix/solid/close-button';
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
} from '@moduix/solid/tour';
import { X as XIcon } from 'lucide-solid';
import { createSignal } from 'solid-js';
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
    target: () => document.querySelector<HTMLElement>('#tour-parts-upload'),
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
  const [status, setStatus] = createSignal('idle');
  const tour = useTour({
    steps,
    onStatusChange: (details) => setStatus(details.status),
  });

  return (
    <div class={styles.root}>
      <Button id="tour-parts-upload" variant="outline">
        Upload files
      </Button>

      <Tour tour={tour}>
        <TourBackdrop />
        <TourSpotlight />
        <TourPositioner>
          <TourContent>
            <TourCloseTrigger
              asChild={(props) => (
                <CloseButton {...props()} aria-label="Close tour" class={styles.closeButton}>
                  <XIcon strokeWidth={3} />
                </CloseButton>
              )}
            />
            <div class={styles.body}>
              <TourTitle />
              <TourDescription />
              <TourProgressText />
            </div>
            <TourControl>
              <TourActions>
                {(actions) =>
                  actions().map((action) => (
                    <TourActionTrigger action={action}>{action.label}</TourActionTrigger>
                  ))
                }
              </TourActions>
            </TourControl>
          </TourContent>
        </TourPositioner>
      </Tour>

      <output>Tour: {status()}</output>
      <Button onClick={() => tour().start()}>Start tour</Button>
    </div>
  );
}