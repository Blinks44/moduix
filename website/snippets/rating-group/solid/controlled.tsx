import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/solid/rating-group';
import { createSignal } from 'solid-js';

export default function ControlledRatingGroupDemo() {
  const [value, setValue] = createSignal(3);

  return (
    <>
      <RatingGroup value={value()} onValueChange={(details) => setValue(details.value)}>
        <RatingGroupLabel>Support quality</RatingGroupLabel>
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </RatingGroup>
      <output>Current value: {value()}</output>
    </>
  );
}
