import type { TourStepDetails } from '@ark-ui/solid/tour';
import { Button } from '@moduix/solid/button';
import { Stack } from '@moduix/solid/stack';
import {
  Tour,
  TourBackdrop,
  TourSpotlight,
  TourPositioner,
  TourContent,
  TourArrow,
  TourTitle,
  TourDescription,
  TourBody,
  TourCloseIcon,
  TourControl,
  TourActionList,
  useTour,
} from '@moduix/solid/tour';

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
    <Stack align="center" gap="3">
      <Button id="tour-with-arrow-upload" variant="outline">
        Upload files
      </Button>
      <Tour tour={tour}>
        <TourBackdrop />
        <TourSpotlight />
        <TourPositioner>
          <TourContent>
            <TourArrow />
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
      <Button onClick={() => tour().start()}>Start tour</Button>
    </Stack>
  );
}