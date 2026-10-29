import {
  AngleSlider,
  AngleSliderControl,
  AngleSliderThumb,
  AngleSliderValueText,
} from '@moduix/react/angle-slider';

export default function BuildFromPartsAngleSliderDemo() {
  return (
    <AngleSlider defaultValue={135} aria-label="Rotation">
      <AngleSliderControl>
        <AngleSliderValueText />
        <AngleSliderThumb />
      </AngleSliderControl>
    </AngleSlider>
  );
}