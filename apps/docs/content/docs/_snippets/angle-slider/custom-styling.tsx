//#region demo
import { AngleSlider } from '@moduix/react';

const initialValue = 315;
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export function AngleSliderStylingDemo() {
  return (
    <AngleSlider
      defaultValue={initialValue}
      aria-label="Spotlight direction"
      className="docs-angle-slider-spotlight"
    >
      <AngleSlider.Label>Spotlight</AngleSlider.Label>
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