import type { TourStepDetails } from '@ark-ui/react/tour';
import { Button } from '@moduix/react/button';
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
  TourActions,
  TourActionTrigger,
  useTour,
} from '@moduix/react/tour';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/tour/tour-advanced-customization.module.css';

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
    <div className={styles.root}>
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
              <TourActions>
                {(actions) =>
                  actions.map((action, index) => (
                    <TourActionTrigger key={`${action.label}-${index}`} action={action} asChild>
                      <Button variant={action.action === 'dismiss' ? 'outline' : 'default'}>
                        {action.label}
                      </Button>
                    </TourActionTrigger>
                  ))
                }
              </TourActions>
            </TourControl>
          </TourContent>
        </TourPositioner>
      </Tour>

      <PreviewMeta>
        <output>Tour: {status}</output>
        <Button onClick={() => tour.start()}>Start custom tour</Button>
      </PreviewMeta>
    </div>
  );
}
