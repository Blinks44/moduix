import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/solid/rating-group';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/rating-group/component-controlled.module.css';

export default function ControlledRatingGroupDemo() {
  const [value, setValue] = createSignal(3);

  return (
    <Stack align="center" gap="3">
      <RatingGroup value={value()} onValueChange={(details) => setValue(details.value)}>
        <RatingGroupLabel>Support quality</RatingGroupLabel>
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </RatingGroup>
      <div data-preview-meta>
        <output class={styles.hint}>Current value: {value()}</output>
      </div>
    </Stack>
  );
}