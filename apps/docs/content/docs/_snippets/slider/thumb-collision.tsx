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
        <Slider.Thumbs />
      </Slider.Control>
    </Slider>
  );
}

//#endregion