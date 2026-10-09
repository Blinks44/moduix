import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarks,
} from '@moduix/react/angle-slider';
import styles from '@/components/examples/angle-slider/angle-slider-with-marks.module.css';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function AngleSliderWithMarksDemo() {
  return (
    <AngleSlider defaultValue={135} aria-label="Rotation" className={styles.root}>
      <AngleSliderLabel>Rotation</AngleSliderLabel>
      <AngleSliderDial>
        <AngleSliderMarks values={markerValues} />
      </AngleSliderDial>
      <AngleSliderHiddenInput />
    </AngleSlider>
  );
}