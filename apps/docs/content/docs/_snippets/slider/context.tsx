/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Slider, useSliderContext } from '@moduix/react';

function SliderStatus() {
  const slider = useSliderContext();
  return (
    <div className="slider-header">
      <Slider.Label>Dragging: {String(slider.dragging)}</Slider.Label>
      <span className="slider-value">{slider.value.join(', ')}</span>
    </div>
  );
}

export function ContextSliderDemo() {
  return (
    <Slider defaultValue={[40]}>
      <SliderStatus />
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