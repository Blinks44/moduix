import { AngleSlider } from '@moduix/solid/angle-slider';
import styles from '@/components/examples/angle-slider/angle-slider-basic.module.css';

export default function AngleSliderDemo() {
  return (
    <AngleSlider defaultValue={135} aria-label="Rotation" class={styles.root}>
      <AngleSlider.Dial />
      <AngleSlider.HiddenInput />
    </AngleSlider>
  );
}