import { Button } from '@moduix/solid/button';
import {
  ProgressCircularCircle,
  ProgressCircularCircleRange,
  ProgressCircularCircleTrack,
  ProgressCircularLabel,
  ProgressCircularRootProvider,
  ProgressCircularValueText,
  useProgress,
} from '@moduix/solid/progress-circular';
import styles from '@/components/examples/progress-circular/component-root-provider.module.css';

export default function RootProviderProgressCircularDemo() {
  const progress = useProgress({
    defaultValue: 58,
  });

  return (
    <>
      <ProgressCircularRootProvider value={progress}>
        <ProgressCircularLabel>Team rollout</ProgressCircularLabel>
        <div class={styles.circleContainer}>
          <ProgressCircularCircle aria-label="Team rollout">
            <ProgressCircularCircleTrack />
            <ProgressCircularCircleRange />
          </ProgressCircularCircle>
          <ProgressCircularValueText />
        </div>
      </ProgressCircularRootProvider>
      <div>
        <output>Progress: {progress().valueAsString}</output>
        <Button type="button" onClick={() => progress().setToMax()}>
          Complete rollout
        </Button>
      </div>
    </>
  );
}