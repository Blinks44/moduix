import { Button } from '@moduix/solid/button';
import { ProgressCircular } from '@moduix/solid/progress-circular';
import styles from '@/components/examples/progress-circular/component-root-provider.module.css';

export default function RootProviderProgressCircularDemo() {
  const progress = ProgressCircular.useProgress({
    defaultValue: 58,
  });

  return (
    <>
      <ProgressCircular.RootProvider value={progress}>
        <ProgressCircular.Label>Team rollout</ProgressCircular.Label>
        <div class={styles.circleContainer}>
          <ProgressCircular.Circle aria-label="Team rollout">
            <ProgressCircular.CircleTrack />
            <ProgressCircular.CircleRange />
          </ProgressCircular.Circle>
          <ProgressCircular.ValueText />
        </div>
      </ProgressCircular.RootProvider>
      <div>
        <output>Progress: {progress().valueAsString}</output>
        <Button type="button" onClick={() => progress().setToMax()}>
          Complete rollout
        </Button>
      </div>
    </>
  );
}