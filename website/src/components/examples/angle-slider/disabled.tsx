import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarks,
} from '@moduix/react/angle-slider';
import styles from '@/components/examples/angle-slider/angle-slider-disabled.module.css';

const initialValue = 45;
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function DisabledAngleSliderDemo() {
  return (
    <AngleSlider
      defaultValue={initialValue}
      disabled
      aria-label="Disabled rotation"
      className={styles.root}
    >
      <AngleSliderLabel>Rotation</AngleSliderLabel>
      <AngleSliderDial>
        <AngleSliderMarks values={markerValues} />
      </AngleSliderDial>
      <AngleSliderHiddenInput />
    </AngleSlider>
  );
}