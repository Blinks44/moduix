import { ProgressCircular } from '@moduix/react/progress-circular';
import styles from '@/components/examples/progress-circular/component-circle-parts.module.css';

export default function CirclePartsProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={65}>
      <ProgressCircular.Label>Disk usage</ProgressCircular.Label>
      <ProgressCircular.Circle aria-label="Disk usage">
        <ProgressCircular.CircleTrack className={styles.track} />
        <ProgressCircular.CircleRange className={styles.range} />
      </ProgressCircular.Circle>
    </ProgressCircular>
  );
}