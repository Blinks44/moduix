import { AngleSlider } from '@moduix/solid/angle-slider';
import styles from '@/components/examples/angle-slider/angle-slider-with-marks.module.css';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function AngleSliderWithMarksDemo() {
  return (
    <AngleSlider defaultValue={135} aria-label="Rotation" class={styles.root}>
      <AngleSlider.Label>Rotation</AngleSlider.Label>
      <AngleSlider.Dial>
        <AngleSlider.Marks values={markerValues} />
      </AngleSlider.Dial>
      <AngleSlider.HiddenInput />
    </AngleSlider>
  );
}