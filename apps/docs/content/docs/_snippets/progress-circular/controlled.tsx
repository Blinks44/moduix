/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ProgressCircular, Slider } from '@moduix/react';
import { useState } from 'react';

export function ControlledProgressCircularDemo() {
  const [value, setValue] = useState(42 as number | null);
  return (
    <div className="progress-circular-stack">
      <ProgressCircular value={value} onValueChange={(details) => setValue(details.value)}>
        <ProgressCircular.Label>Upload status</ProgressCircular.Label>
        <div className="progress-circular-circle-container">
          <ProgressCircular.Circle>
            <ProgressCircular.CircleTrack />
            <ProgressCircular.CircleRange />
          </ProgressCircular.Circle>
          <ProgressCircular.ValueText />
        </div>
      </ProgressCircular>
      <Slider
        className="progress-circular-slider"
        min={0}
        max={100}
        value={[value ?? 0]}
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
    </div>
  );
}

//#endregion