import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@moduix/react/slider';
import { useState } from 'react';

export default function ControlledSliderDemo() {
  const [value, setValue] = useState([24]);
  return (
    <Slider value={value} onValueChange={(details) => setValue(details.value)}>
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