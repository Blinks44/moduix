//#region demo
import { AngleSlider } from '@moduix/react';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export function AngleSliderFormDemo() {
  return (
    <AngleSlider
      defaultValue={135}
      aria-label="Rotation"
      name="rotation"
      className="docs-angle-slider-form"
    >
      <AngleSlider.Label>Rotation</AngleSlider.Label>
      <AngleSlider.Control>
        <AngleSlider.Marks values={markerValues} />
        <AngleSlider.Thumb />
      </AngleSlider.Control>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </AngleSlider>
  );
}
//#endregion