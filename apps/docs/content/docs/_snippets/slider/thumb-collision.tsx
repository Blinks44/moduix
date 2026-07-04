/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Slider } from '@moduix/react';

export function ThumbCollisionSliderDemo() {
  return (
    <Slider defaultValue={[25, 60]} thumbCollisionBehavior="push">
      <div className="slider-header">
        <Slider.Label>Linked range</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Minimum linked value">
          <Slider.HiddenInput />
        </Slider.Thumb>
        <Slider.Thumb index={1} aria-label="Maximum linked value">
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}

//#endregion