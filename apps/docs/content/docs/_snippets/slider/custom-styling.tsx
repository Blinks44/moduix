/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Slider } from '@moduix/react';

export function CustomStylingSliderDemo() {
  return (
    <Slider defaultValue={[56]} className="slider-custom">
      <Slider.Label>Temperature</Slider.Label>
      <Slider.ValueText />
      <Slider.Control className="slider-custom-control">
        <Slider.Track className="slider-custom-track">
          <Slider.Range className="slider-custom-range" />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Temperature" className="slider-custom-thumb">
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}

//#endregion