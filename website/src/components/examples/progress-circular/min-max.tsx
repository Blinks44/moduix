import {
  ProgressCircular,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularValueText,
} from '@moduix/react/progress-circular';
import styles from '@/components/examples/progress-circular/component-min-max.module.css';

export default function MinMaxProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={420} min={200} max={800}>
      <ProgressCircularLabel>Requests per minute</ProgressCircularLabel>
      <div className={styles.circleContainer}>
        <ProgressCircularRing aria-label="Requests per minute" />
        <ProgressCircularValueText />
      </div>
    </ProgressCircular>
  );
}