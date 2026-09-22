import {
  ProgressCircular,
  ProgressCircularCircle,
  ProgressCircularCircleRange,
  ProgressCircularCircleTrack,
  ProgressCircularLabel,
  ProgressCircularValueText,
  ProgressCircularView,
} from '@moduix/react/progress-circular';
import styles from '@/components/examples/progress-circular/component-state-views.module.css';

const progressCircularStateMessages = {
  indeterminate: 'Waiting for source data',
  loading: 'Transfer in progress',
  complete: 'Export complete',
};

export default function StateViewsProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={null}>
      <ProgressCircularLabel>Preparing report</ProgressCircularLabel>
      <div className={styles.circleContainer}>
        <ProgressCircularCircle aria-label="Preparing report">
          <ProgressCircularCircleTrack />
          <ProgressCircularCircleRange />
        </ProgressCircularCircle>
        <ProgressCircularValueText />
      </div>
      <ProgressCircularView className={styles.state} state="indeterminate">
        {progressCircularStateMessages.indeterminate}
      </ProgressCircularView>
      <ProgressCircularView className={styles.state} state="loading">
        {progressCircularStateMessages.loading}
      </ProgressCircularView>
      <ProgressCircularView className={styles.state} state="complete">
        {progressCircularStateMessages.complete}
      </ProgressCircularView>
    </ProgressCircular>
  );
}