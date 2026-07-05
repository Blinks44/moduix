/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Slider } from '@moduix/react';

export function VerticalSliderDemo() {
  return (
    <Slider orientation="vertical" defaultValue={[60]} className="slider-vertical">
      <Slider.Label>Output</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Output">
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}

//#endregion