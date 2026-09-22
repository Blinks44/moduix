import {
  ProgressCircular,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularValueText,
} from '@moduix/react/progress-circular';
import styles from '@/components/examples/progress-circular/component-indeterminate.module.css';

export default function IndeterminateProgressCircularDemo() {
  return (
    <ProgressCircular className={styles.indeterminate} defaultValue={null}>
      <ProgressCircularLabel>Preparing report</ProgressCircularLabel>
      <div className={styles.circleContainer}>
        <ProgressCircularRing aria-label="Preparing report" />
        <ProgressCircularValueText />
      </div>
    </ProgressCircular>
  );
}
