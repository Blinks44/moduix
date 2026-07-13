/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ProgressLinear, Slider } from '@moduix/react';
import { useState } from 'react';

export function ControlledProgressLinearDemo() {
  const [value, setValue] = useState(45);
  return (
    <div className="progress-linear-stack">
      <ProgressLinear value={value} onValueChange={(details) => setValue(details.value)}>
        <ProgressLinear.Label>Upload status</ProgressLinear.Label>
        <ProgressLinear.ValueText />
        <ProgressLinear.Track>
          <ProgressLinear.Range />
        </ProgressLinear.Track>
      </ProgressLinear>
      <Slider
        className="progress-linear-slider"
        min={0}
        max={100}
        value={[value]}
        onValueChange={(details) => setValue(details.value[0] ?? 0)}
      >
        <Slider.Label>Progress value</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Progress value"></Slider.Thumb>
        </Slider.Control>
      </Slider>
    </div>
  );
}

//#endregion