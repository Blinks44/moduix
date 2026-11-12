import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@moduix/solid/slider';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';

export default function EventsSliderDemo() {
  const [liveValue, setLiveValue] = createSignal([40]);
  const [committedValue, setCommittedValue] = createSignal([40]);

  return (
    <Stack align="center" gap="4">
      <Slider
        defaultValue={[40]}
        onValueChange={(details) => setLiveValue(details.value)}
        onValueChangeEnd={(details) => setCommittedValue(details.value)}
      >
        <SliderLabel>Gain</SliderLabel>
        <SliderValueText />
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumbs />
        </SliderControl>
      </Slider>
      <div data-preview-meta>
        <output>
          Live: {liveValue().join(', ')} / Committed: {committedValue().join(', ')}
        </output>
      </div>
    </Stack>
  );
}