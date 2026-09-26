import {
  ProgressCircular,
  ProgressCircularCircle,
  ProgressCircularCircleRange,
  ProgressCircularCircleTrack,
  ProgressCircularLabel,
} from '@moduix/solid/progress-circular';
import styles from '@/components/examples/progress-circular/component-circle-parts.module.css';

export default function CirclePartsProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={65}>
      <ProgressCircularLabel>Disk usage</ProgressCircularLabel>
      <ProgressCircularCircle aria-label="Disk usage">
        <ProgressCircularCircleTrack class={styles.track} />
        <ProgressCircularCircleRange class={styles.range} />
      </ProgressCircularCircle>
    </ProgressCircular>
  );
}