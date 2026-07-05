/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useSliderContext } from '@ark-ui/react/slider';
import { Slider } from '@moduix/react';

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
        <Slider.Thumb index={0} aria-label="Context value">
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}

//#endregion