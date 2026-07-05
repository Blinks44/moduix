/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Slider } from '@moduix/react';

export function CenterOriginSliderDemo() {
  return (
    <Slider min={-50} max={50} defaultValue={[20]} origin="center">
      <div className="slider-header">
        <Slider.Label>Balance</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Balance">
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}

//#endregion