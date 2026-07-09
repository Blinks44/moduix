//#region demo
import { AngleSlider } from '@moduix/react';

const initialValue = 45;
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export function DisabledAngleSliderDemo() {
  return (
    <AngleSlider
      defaultValue={initialValue}
      disabled
      aria-label="Disabled rotation"
      className="docs-angle-slider-disabled"
    >
      <AngleSlider.Label>Rotation</AngleSlider.Label>
      <AngleSlider.Dial>
        <AngleSlider.Marks values={markerValues} />
      </AngleSlider.Dial>
      <AngleSlider.ValueText />
    </AngleSlider>
  );
}
//#endregion