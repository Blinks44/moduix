import { ProgressCircular } from '@moduix/solid/progress-circular';
import styles from '@/components/examples/progress-circular/component-indeterminate.module.css';

export default function IndeterminateProgressCircularDemo() {
  return (
    <ProgressCircular class={styles.indeterminate} defaultValue={null}>
      <ProgressCircular.Label>Preparing report</ProgressCircular.Label>
      <div class={styles.circleContainer}>
        <ProgressCircular.Ring aria-label="Preparing report" />
        <ProgressCircular.ValueText />
      </div>
    </ProgressCircular>
  );
}