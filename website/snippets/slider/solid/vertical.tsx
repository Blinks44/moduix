import {
  Slider,
  SliderControl,
  SliderRange,
  SliderThumbs,
  SliderTrack,
} from '@moduix/solid/slider';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';

export default function VerticalSliderDemo() {
  const [value, setValue] = createSignal([60]);

  return (
    <Stack align="center" gap="3">
      <Slider
        aria-label={['Output']}
        orientation="vertical"
        value={value()}
        onValueChange={(details) => setValue(details.value)}
      >
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumbs />
        </SliderControl>
      </Slider>
      <output>Output: {value().join(', ')}</output>
    </Stack>
  );
}