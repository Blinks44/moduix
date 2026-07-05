/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Slider } from '@moduix/react';

export function ThumbAlignmentSliderDemo() {
  return (
    <Slider defaultValue={[0]} thumbAlignment="center">
      <div className="slider-header">
        <Slider.Label>Centered thumb</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Centered thumb">
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}

//#endregion