import type { TourStepDetails } from '@ark-ui/solid/tour';
import { Button } from '@moduix/solid/button';
import { Tour, useTour } from '@moduix/solid/tour';
import styles from '@/components/examples/tour/tour-with-arrow.module.css';

const steps = [
  {
    id: 'upload',
    type: 'tooltip',
    title: 'Upload files',
    description: 'This anchored step uses an arrow to point back to its target.',
    target: () => document.querySelector<HTMLElement>('#tour-with-arrow-upload'),
    actions: [{ label: 'Done', action: 'dismiss' }],
    arrow: true,
  },
] satisfies TourStepDetails[];

export default function TourWithArrowDemo() {
  const tour = useTour({ steps });

  return (
    <div class={styles.root}>
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
      <Button onClick={() => tour().start()}>Start tour</Button>
    </div>
  );
}