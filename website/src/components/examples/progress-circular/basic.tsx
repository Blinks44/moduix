import {
  ProgressCircular,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularValueText,
} from '@moduix/react/progress-circular';
import styles from '@/components/examples/progress-circular/component-basic.module.css';

export default function ProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={42}>
      <ProgressCircularLabel>Export data</ProgressCircularLabel>
      <div className={styles.circleContainer}>
        <ProgressCircularRing aria-label="Export data" />
        <ProgressCircularValueText />
      </div>
    </ProgressCircular>
  );
}
