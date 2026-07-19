//#region demo
import { AngleSlider } from '@moduix/react';
import { useState } from 'react';

const initialValue = 210;
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export function ControlledAngleSliderDemo() {
  const [value, setValue] = useState(initialValue);

  return (
    <AngleSlider
      value={value}
      aria-label="Heading"
      className="docs-angle-slider-controlled"
      onValueChange={(details) => setValue(details.value)}
    >
      <AngleSlider.Label>Heading</AngleSlider.Label>
      <AngleSlider.Dial>
        <AngleSlider.Marks values={markerValues} />
      </AngleSlider.Dial>
      <AngleSlider.ValueText />
    </AngleSlider>
  );
}
//#endregion