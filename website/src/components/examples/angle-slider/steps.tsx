import { AngleSlider } from '@moduix/react/angle-slider';
import styles from '@/components/examples/angle-slider/angle-slider-steps.module.css';

const initialValue = 60;
const step = 15;
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function SteppedAngleSliderDemo() {
  return (
    <AngleSlider
      defaultValue={initialValue}
      step={step}
      aria-label="Snap angle"
      className={styles.root}
    >
      <AngleSlider.Label>15 Step</AngleSlider.Label>
      <AngleSlider.Dial>
        <AngleSlider.Marks values={markerValues} />
      </AngleSlider.Dial>
      <AngleSlider.HiddenInput />
    </AngleSlider>
  );
}