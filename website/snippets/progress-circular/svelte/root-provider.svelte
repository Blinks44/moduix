<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    ProgressCircularCircle,
    ProgressCircularCircleRange,
    ProgressCircularCircleTrack,
    ProgressCircularLabel,
    ProgressCircularRootProvider,
    ProgressCircularValueText,
    useProgress,
  } from '@moduix/svelte/progress-circular';
  import styles from '@/components/examples/progress-circular/component-root-provider.module.css';

  const id = $props.id();
  const progress = useProgress({ id, defaultValue: 58 });
</script>

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
<div data-preview-meta>
  <output>Progress: {progress().valueAsString}</output>
  <Button type="button" onclick={() => progress().setToMax()}>Complete rollout</Button>
</div>