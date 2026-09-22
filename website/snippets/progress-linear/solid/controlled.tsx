import {
  ProgressLinear,
  ProgressLinearLabel,
  ProgressLinearValueText,
  ProgressLinearTrack,
  ProgressLinearRange,
} from '@moduix/solid/progress-linear';
import { Slider } from '@moduix/solid/slider';
import { createSignal } from 'solid-js';

export default function ControlledProgressLinearDemo() {
  const [value, setValue] = createSignal(45);

  return (
    <>
      <ProgressLinear value={value()} onValueChange={(details) => setValue(details.value ?? 0)}>
        <ProgressLinearLabel>Upload status</ProgressLinearLabel>
        <ProgressLinearValueText />
        <ProgressLinearTrack aria-label="Upload status">
          <ProgressLinearRange />
        </ProgressLinearTrack>
      </ProgressLinear>
      <Slider
        min={0}
        max={100}
        value={[value()]}
        onValueChange={(details) => setValue(details.value[0] ?? 0)}
      >
        <Slider.Label>Progress value</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Progress value">
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider>
    </>
  );
}
