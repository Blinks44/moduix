import { AngleSlider } from '@moduix/solid/angle-slider';
import styles from '@/components/examples/angle-slider/angle-slider-invalid.module.css';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function InvalidAngleSliderDemo() {
  return (
    <AngleSlider defaultValue={315} invalid aria-label="Invalid heading" class={styles.root}>
      <AngleSlider.Label>Heading</AngleSlider.Label>
      <AngleSlider.Dial>
        <AngleSlider.Marks values={markerValues} />
      </AngleSlider.Dial>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </AngleSlider>
  );
}