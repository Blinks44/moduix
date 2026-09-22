import {
  ProgressCircular,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularValueText,
} from '@moduix/solid/progress-circular';
import styles from '@/components/examples/progress-circular/component-indeterminate.module.css';

export default function IndeterminateProgressCircularDemo() {
  return (
    <ProgressCircular class={styles.indeterminate} defaultValue={null}>
      <ProgressCircularLabel>Preparing report</ProgressCircularLabel>
      <div class={styles.circleContainer}>
        <ProgressCircularRing aria-label="Preparing report" />
        <ProgressCircularValueText />
      </div>
    </ProgressCircular>
  );
}
