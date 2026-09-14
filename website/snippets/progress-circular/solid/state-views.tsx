import { ProgressCircular } from '@moduix/solid/progress-circular';
import styles from '@/components/examples/progress-circular/component-state-views.module.css';

const progressCircularStateMessages = {
  indeterminate: 'Waiting for source data',
  loading: 'Transfer in progress',
  complete: 'Export complete',
};

export default function StateViewsProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={null}>
      <ProgressCircular.Label>Preparing report</ProgressCircular.Label>
      <div class={styles.circleContainer}>
        <ProgressCircular.Circle aria-label="Preparing report">
          <ProgressCircular.CircleTrack />
          <ProgressCircular.CircleRange />
        </ProgressCircular.Circle>
        <ProgressCircular.ValueText />
      </div>
      <ProgressCircular.View class={styles.state} state="indeterminate">
        {progressCircularStateMessages.indeterminate}
      </ProgressCircular.View>
      <ProgressCircular.View class={styles.state} state="loading">
        {progressCircularStateMessages.loading}
      </ProgressCircular.View>
      <ProgressCircular.View class={styles.state} state="complete">
        {progressCircularStateMessages.complete}
      </ProgressCircular.View>
    </ProgressCircular>
  );
}