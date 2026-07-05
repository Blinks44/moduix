//#region demo
import { AngleSlider } from '@moduix/react';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export function AngleSliderDemo() {
  return (
    <AngleSlider defaultValue={135} aria-label="Rotation" className="docs-angle-slider-basic">
      <AngleSlider.Label>Rotation</AngleSlider.Label>
      <AngleSlider.Control>
        <AngleSlider.MarkerGroup>
          {markerValues.map((value) => (
            <AngleSlider.Marker key={value} value={value} />
          ))}
        </AngleSlider.MarkerGroup>
        <AngleSlider.Thumb />
      </AngleSlider.Control>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </AngleSlider>
  );
}
//#endregion