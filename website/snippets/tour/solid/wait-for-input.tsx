import type { TourStepDetails } from '@ark-ui/solid/tour';
import { Button } from '@moduix/solid/button';
import { Input } from '@moduix/solid/input';
import { Stack } from '@moduix/solid/stack';
import {
  Tour,
  TourBackdrop,
  TourSpotlight,
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

const steps = [
  {
    id: 'name',
    type: 'tooltip',
    title: 'Enter a name',
    description: 'The tour continues after at least two characters.',
    target: () => document.querySelector<HTMLInputElement>('#tour-wait-name'),
  },
  {
    id: 'complete',
    type: 'dialog',
    title: 'Name saved',
    description: 'Typing two characters moved the tour to this step.',
    actions: [{ label: 'Done', action: 'dismiss' }],
    backdrop: true,
  },
] satisfies TourStepDetails[];

export default function TourWaitForInputDemo() {
  const [status, setStatus] = createSignal('idle');
  const tour = useTour({
    steps,
    onStatusChange: (details) => setStatus(details.status),
  });

  return (
    <Stack align="center" gap="3">
      <Input
        id="tour-wait-name"
        aria-label="Workspace name"
        placeholder="Workspace name"
        onInput={(event) => {
          if (event.currentTarget.value.trim().length >= 2) {
            tour().next();
          }
        }}
      />

      <Tour tour={tour}>
        <TourBackdrop />
        <TourSpotlight />
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

      <output>Tour: {status()}</output>
      <Button onClick={() => tour().start()}>Start input tour</Button>
    </Stack>
  );
}