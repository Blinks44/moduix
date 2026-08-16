import { AngleSlider } from '@moduix/react/angle-slider';

export default function AngleSliderDemo() {
  return (
    <AngleSlider defaultValue={135} aria-label="Rotation" className="docs-angle-slider-basic">
      <AngleSlider.Dial />
    </AngleSlider>
  );
}