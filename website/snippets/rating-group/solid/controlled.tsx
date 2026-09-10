import { RatingGroup } from '@moduix/solid/rating-group';
import { createSignal } from 'solid-js';

export default function ControlledRatingGroupDemo() {
  const [value, setValue] = createSignal(3);

  return (
    <>
      <RatingGroup value={value()} onValueChange={(details) => setValue(details.value)}>
        <RatingGroup.Label>Support quality</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroup.Items />
        </RatingGroup.Control>
      </RatingGroup>
      <output>Current value: {value()}</output>
    </>
  );
}