/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Slider } from '@moduix/react';

export function RangeSliderDemo() {
  return (
    <Slider defaultValue={[30, 60]}>
      <Slider.Label>Price range</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Minimum price">
          <Slider.HiddenInput />
        </Slider.Thumb>
        <Slider.Thumb index={1} aria-label="Maximum price">
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
      <Slider.ValueText />
    </Slider>
  );
}

//#endregion