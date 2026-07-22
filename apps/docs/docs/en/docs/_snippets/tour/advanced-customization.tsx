import type { TourStepDetails } from '@ark-ui/react/tour';
import { Button, Tour, useTour } from '@moduix/react';

const steps = [
  {
    id: 'welcome',
    type: 'dialog',
    title: 'Welcome to the workspace',
    description: 'Customize the action rendering while preserving Ark action objects.',
    actions: [{ label: 'Start', action: 'next' }],
    backdrop: true,
  },
] satisfies TourStepDetails[];

export default function TourDemo() {
  const tour = useTour({ steps });

  return (
    <>
      <Button onClick={() => tour.start()}>Start custom tour</Button>

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