import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarks,
} from '@moduix/solid/angle-slider';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/angle-slider/angle-slider-controlled.module.css';

const initialValue = 210;
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function ControlledAngleSliderDemo() {
  const [value, setValue] = createSignal(initialValue);

  return (
    <AngleSlider
      value={value()}
      aria-label="Heading"
      class={styles.root}
      onValueChange={(details) => setValue(details.value)}
    >
      <AngleSliderLabel>Heading</AngleSliderLabel>
      <AngleSliderDial>
        <AngleSliderMarks values={markerValues} />
      </AngleSliderDial>
      <AngleSliderHiddenInput />
    </AngleSlider>
  );
}