import {
  ProgressCircular,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularValueText,
} from '@moduix/solid/progress-circular';
import styles from '@/components/examples/progress-circular/component-min-max.module.css';

export default function MinMaxProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={420} min={200} max={800}>
      <ProgressCircularLabel>Requests per minute</ProgressCircularLabel>
      <div class={styles.circleContainer}>
        <ProgressCircularRing aria-label="Requests per minute" />
        <ProgressCircularValueText />
      </div>
    </ProgressCircular>
  );
}
