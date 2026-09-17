import { AngleSlider } from '@moduix/react/angle-slider';
import styles from '@/components/examples/angle-slider/angle-slider-read-only.module.css';

const initialValue = 300;
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function ReadOnlyAngleSliderDemo() {
  return (
    <AngleSlider
      defaultValue={initialValue}
      readOnly
      aria-label="Locked angle"
      className={styles.root}
    >
      <AngleSlider.Label>Locked angle</AngleSlider.Label>
      <AngleSlider.Dial>
        <AngleSlider.Marks values={markerValues} />
      </AngleSlider.Dial>
      <AngleSlider.HiddenInput />
    </AngleSlider>
  );
}