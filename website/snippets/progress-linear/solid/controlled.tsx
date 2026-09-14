import { ProgressLinear } from '@moduix/solid/progress-linear';
import { Slider } from '@moduix/solid/slider';
import { createSignal } from 'solid-js';

export default function ControlledProgressLinearDemo() {
  const [value, setValue] = createSignal(45);

  return (
    <>
      <ProgressLinear value={value()} onValueChange={(details) => setValue(details.value ?? 0)}>
        <ProgressLinear.Label>Upload status</ProgressLinear.Label>
        <ProgressLinear.ValueText />
        <ProgressLinear.Track aria-label="Upload status">
          <ProgressLinear.Range />
        </ProgressLinear.Track>
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