import { ProgressCircular } from '@moduix/react/progress-circular';
import styles from '@/components/examples/progress-circular/component-indeterminate.module.css';

export default function IndeterminateProgressCircularDemo() {
  return (
    <ProgressCircular className={styles.indeterminate} defaultValue={null}>
      <ProgressCircular.Label>Preparing report</ProgressCircular.Label>
      <div className={styles.circleContainer}>
        <ProgressCircular.Ring aria-label="Preparing report" />
        <ProgressCircular.ValueText />
      </div>
    </ProgressCircular>
  );
}