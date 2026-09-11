import { ProgressCircular } from '@moduix/solid/progress-circular';
import styles from '@/components/examples/progress-circular/component-min-max.module.css';

export default function MinMaxProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={420} min={200} max={800}>
      <ProgressCircular.Label>Requests per minute</ProgressCircular.Label>
      <div class={styles.circleContainer}>
        <ProgressCircular.Ring aria-label="Requests per minute" />
        <ProgressCircular.ValueText />
      </div>
    </ProgressCircular>
  );
}