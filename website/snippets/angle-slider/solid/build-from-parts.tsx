import {
  AngleSlider,
  AngleSliderControl,
  AngleSliderThumb,
  AngleSliderValueText,
} from '@moduix/solid/angle-slider';

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