//#region demo
import { AngleSlider } from '@moduix/react';

const initialValue = 60;
const step = 15;
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export function SteppedAngleSliderDemo() {
  return (
    <AngleSlider
      defaultValue={initialValue}
      step={step}
      aria-label="Snap angle"
      className="docs-angle-slider-step"
    >
      <AngleSlider.Label>15 Step</AngleSlider.Label>
      <AngleSlider.Dial>
        <AngleSlider.Marks values={markerValues} />
      </AngleSlider.Dial>
      <AngleSlider.ValueText />
    </AngleSlider>
  );
}
//#endregion