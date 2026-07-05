/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

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
    type: 'dialog',
    title: 'You are ready',
    description: 'Dismiss the tour when the walkthrough is complete.',
    actions: [{ label: 'Finish', action: 'dismiss' }],
    backdrop: true,
  },
] satisfies TourStepDetails[];

import type { TourStepDetails } from '@ark-ui/react/tour';
import { Button, Tour, useTour } from '@moduix/react';

export function TourDemo() {
  const tour = useTour({ steps });

  return (
    <>
      <Button onClick={() => tour.start()}>Start tour</Button>
      <Button id="tour-basic-upload" variant="outline">
        Upload
      </Button>

      <Tour tour={tour} lazyMount unmountOnExit>
        <Tour.Backdrop />
        <Tour.Spotlight />
        <Tour.Positioner>
          <Tour.Content>
            <Tour.Arrow />
            <Tour.CloseIcon />
            <Tour.Title />
            <Tour.Description />
            <Tour.ProgressText />
            <Tour.Control>
              <Tour.Actions>
                {(actions) =>
                  actions.map((action) => <Tour.ActionTrigger key={action.label} action={action} />)
                }
              </Tour.Actions>
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour>
    </>
  );
}

//#endregion