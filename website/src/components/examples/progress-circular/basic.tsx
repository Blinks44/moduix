import { ProgressCircular } from '@moduix/react/progress-circular';
import styles from '@/components/examples/progress-circular/component-basic.module.css';

export default function ProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={42}>
      <ProgressCircular.Label>Export data</ProgressCircular.Label>
      <div className={styles.circleContainer}>
        <ProgressCircular.Ring aria-label="Export data" />
        <ProgressCircular.ValueText />
      </div>
    </ProgressCircular>
  );
}