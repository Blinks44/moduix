import { ProgressCircular } from '@moduix/solid/progress-circular';
import styles from '@/components/examples/progress-circular/component-circle-parts.module.css';

export default function CirclePartsProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={65}>
      <ProgressCircular.Label>Disk usage</ProgressCircular.Label>
      <ProgressCircular.Circle aria-label="Disk usage">
        <ProgressCircular.CircleTrack class={styles.track} />
        <ProgressCircular.CircleRange class={styles.range} />
      </ProgressCircular.Circle>
    </ProgressCircular>
  );
}