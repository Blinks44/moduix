import {
  Slider,
  SliderControl,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderThumbs,
  SliderTrack,
} from '@moduix/solid/slider';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';

const marks = [0, 25, 50, 75, 100];

export default function VerticalMarksSliderDemo() {
  const [value, setValue] = createSignal([50]);

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
        <SliderMarkerGroup>
          {marks.map((mark) => (
            <SliderMarker value={mark}>{mark}</SliderMarker>
          ))}
        </SliderMarkerGroup>
      </Slider>
      <output>Output: {value().join(', ')}</output>
    </Stack>
  );
}