/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Slider } from '@moduix/react';

const marks = [0, 25, 50, 75, 100];

export function MarksSliderDemo() {
  return (
    <Slider defaultValue={[50]}>
      <div className="slider-header">
        <Slider.Label>Progress</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
      <Slider.MarkerGroup>
        {marks.map((value) => (
          <Slider.Marker key={value} value={value}>
            {value}
          </Slider.Marker>
        ))}
      </Slider.MarkerGroup>
    </Slider>
  );
}

//#endregion