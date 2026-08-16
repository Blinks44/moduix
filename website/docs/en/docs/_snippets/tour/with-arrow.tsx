import type { TourStepDetails } from '@ark-ui/react/tour';
import { Button } from '@moduix/react/button';
import { Tour, useTour } from '@moduix/react/tour';

const steps = [
  {
    id: 'upload',
    type: 'tooltip',
    title: 'Upload files',
    description: 'This anchored step uses an arrow to point back to its target.',
    target: () => document.querySelector('#tour-with-arrow-upload') as HTMLElement | null,
    actions: [{ label: 'Done', action: 'dismiss' }],
    arrow: true,
  },
] satisfies TourStepDetails[];

export default function TourWithArrowDemo() {
  const tour = useTour({ steps });

  return (
    <div style={{ display: 'grid', gap: 'var(--moduix-spacing-3)', justifyItems: 'center' }}>
      <Button id="tour-with-arrow-upload" variant="outline">
        Upload files
      </Button>
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
            </Tour.Body>
            <Tour.Control>
              <Tour.ActionList />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour>
      <Button onClick={() => tour.start()}>Start tour</Button>
    </div>
  );
}