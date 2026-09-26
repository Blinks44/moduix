import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarks,
} from '@moduix/react/angle-slider';
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
      <AngleSliderLabel>15 Step</AngleSliderLabel>
      <AngleSliderDial>
        <AngleSliderMarks values={markerValues} />
      </AngleSliderDial>
      <AngleSliderHiddenInput />
    </AngleSlider>
  );
}