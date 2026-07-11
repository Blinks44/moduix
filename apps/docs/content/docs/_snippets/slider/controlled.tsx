/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Slider } from '@moduix/react';
import { useState } from 'react';

export function ControlledSliderDemo() {
  const [value, setValue] = useState([24]);
  return (
    <Slider value={value} onValueChange={(details) => setValue(details.value)}>
      <div className="slider-header">
        <Slider.Label>Brightness</Slider.Label>
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