//#region demo
import { AngleSlider } from '@moduix/react';

export function AngleSliderDemo() {
  return (
    <AngleSlider defaultValue={135} aria-label="Rotation" className="docs-angle-slider-basic">
      <AngleSlider.Control>
        <AngleSlider.Thumb />
      </AngleSlider.Control>
    </AngleSlider>
  );
}
//#endregion