import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@moduix/solid/slider';
import { createSignal } from 'solid-js';

export default function ControlledSliderDemo() {
  const [value, setValue] = createSignal([24]);

  return (
    <Slider value={value()} onValueChange={(details) => setValue(details.value)}>
      <SliderLabel>Brightness</SliderLabel>
      <SliderValueText />
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
    </Slider>
  );
}