//#region demo
import { AngleSlider } from '@moduix/react';

const initialValue = 300;
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export function ReadOnlyAngleSliderDemo() {
  return (
    <AngleSlider
      defaultValue={initialValue}
      readOnly
      aria-label="Locked angle"
      className="docs-angle-slider-readonly"
    >
      <AngleSlider.Label>Locked angle</AngleSlider.Label>
      <AngleSlider.Control>
        <AngleSlider.Marks values={markerValues} />
        <AngleSlider.Thumb />
      </AngleSlider.Control>
      <AngleSlider.ValueText />
    </AngleSlider>
  );
}
//#endregion