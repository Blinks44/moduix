//#region demo
import { AngleSlider } from '@moduix/react';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export function InvalidAngleSliderDemo() {
  return (
    <AngleSlider
      defaultValue={315}
      invalid
      aria-label="Invalid heading"
      className="docs-angle-slider-invalid"
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