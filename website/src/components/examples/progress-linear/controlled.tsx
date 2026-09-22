import {
  ProgressLinear,
  ProgressLinearLabel,
  ProgressLinearValueText,
  ProgressLinearTrack,
  ProgressLinearRange,
} from '@moduix/react/progress-linear';
import {
  Slider,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderThumb,
  SliderTrack,
  SliderValueText,
} from '@moduix/react/slider';
import { useState } from 'react';

export default function ControlledProgressLinearDemo() {
  const [value, setValue] = useState(45);

  return (
    <>
      <ProgressLinear value={value} onValueChange={(details) => setValue(details.value ?? 0)}>
        <ProgressLinearLabel>Upload status</ProgressLinearLabel>
        <ProgressLinearValueText />
        <ProgressLinearTrack aria-label="Upload status">
          <ProgressLinearRange />
        </ProgressLinearTrack>
      </ProgressLinear>
      <Slider
        min={0}
        max={100}
        value={[value]}
        onValueChange={(details) => setValue(details.value[0] ?? 0)}
      >
        <SliderLabel>Progress value</SliderLabel>
        <SliderValueText />
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0} aria-label="Progress value">
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
      </Slider>
    </>
  );
}