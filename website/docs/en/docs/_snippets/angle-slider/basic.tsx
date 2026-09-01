import { AngleSlider } from '@moduix/react/angle-slider';
import styles from '@/components/examples/angle-slider-basic.module.css';

export default function AngleSliderDemo() {
  return (
    <AngleSlider defaultValue={135} aria-label="Rotation" className={styles.root}>
      <AngleSlider.Dial />
    </AngleSlider>
  );
}