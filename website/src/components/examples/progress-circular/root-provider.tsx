import { Button } from '@moduix/react/button';
import { ProgressCircular } from '@moduix/react/progress-circular';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/progress-circular/component-root-provider.module.css';

export default function RootProviderProgressCircularDemo() {
  const progress = ProgressCircular.useProgress({
    defaultValue: 58,
  });
  return (
    <>
      <ProgressCircular.RootProvider value={progress}>
        <ProgressCircular.Label>Team rollout</ProgressCircular.Label>
        <div className={styles.circleContainer}>
          <ProgressCircular.Circle aria-label="Team rollout">
            <ProgressCircular.CircleTrack />
            <ProgressCircular.CircleRange />
          </ProgressCircular.Circle>
          <ProgressCircular.ValueText />
        </div>
      </ProgressCircular.RootProvider>
      <PreviewMeta>
        <output>Progress: {progress.valueAsString}</output>
        <Button type="button" onClick={() => progress.setToMax()}>
          Complete rollout
        </Button>
      </PreviewMeta>
    </>
  );
}