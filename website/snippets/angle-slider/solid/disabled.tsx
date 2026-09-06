import { AngleSlider } from '@moduix/solid/angle-slider';
import styles from '@/components/examples/angle-slider/angle-slider-disabled.module.css';

const initialValue = 45;
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function DisabledAngleSliderDemo() {
  return (
    <AngleSlider
      defaultValue={initialValue}
      disabled
      aria-label="Disabled rotation"
      class={styles.root}
    >
      <AngleSlider.Label>Rotation</AngleSlider.Label>
      <AngleSlider.Dial>
        <AngleSlider.Marks values={markerValues} />
      </AngleSlider.Dial>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </AngleSlider>
  );
}