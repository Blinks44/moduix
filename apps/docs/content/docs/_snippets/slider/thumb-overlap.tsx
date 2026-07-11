/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Slider } from '@moduix/react';

export function ThumbOverlapSliderDemo() {
  return (
    <Slider defaultValue={[25, 60]} minStepsBetweenThumbs={5}>
      <div className="slider-header">
        <Slider.Label>Minimum gap</Slider.Label>
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