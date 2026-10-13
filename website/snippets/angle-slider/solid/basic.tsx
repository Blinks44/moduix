import { AngleSlider, AngleSliderDial } from '@moduix/solid/angle-slider';

export default function AngleSliderDemo() {
  return (
    <AngleSlider defaultValue={135} aria-label="Rotation">
      <AngleSliderDial />
    </AngleSlider>
  );
}