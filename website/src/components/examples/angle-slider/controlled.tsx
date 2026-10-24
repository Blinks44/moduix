import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderLabel,
  AngleSliderMarks,
} from '@moduix/react/angle-slider';
import { useState } from 'react';
import styles from '@/components/examples/angle-slider/angle-slider-controlled.module.css';

const initialValue = 210;
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function ControlledAngleSliderDemo() {
  const [value, setValue] = useState(initialValue);

  return (
    <AngleSlider
      value={value}
      className={styles.root}
      onValueChange={(details) => setValue(details.value)}
    >
      <AngleSliderLabel>Heading</AngleSliderLabel>
      <AngleSliderDial>
        <AngleSliderMarks values={markerValues} />
      </AngleSliderDial>
    </AngleSlider>
  );
}