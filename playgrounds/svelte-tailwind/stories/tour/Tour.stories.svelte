<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import {
    Tour,
    TourActionList,
    TourBackdrop,
    TourCloseIcon,
    TourContent,
    TourControl,
    TourDescription,
    TourPositioner,
    TourSpotlight,
    TourTitle,
    useTour,
    waitForEvent,
  } from '@/components/tour';
  import { basicSteps, mixedSteps, withArrowSteps } from './steps';
  import TourOverlay from './TourOverlay.svelte';

  const { Story } = defineMeta({
    title: 'Components/Tour',
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
    },
  });

  const canvasClass = 'flex w-[min(28rem,calc(100vw-2rem))] flex-col items-start gap-4';
  const targetsClass = 'flex flex-wrap gap-2';
  const targetClass =
    'grid min-h-20 w-full place-items-center rounded-lg border border-border bg-muted text-sm leading-5 text-foreground';
  const progressTrackClass = 'mt-2 h-1 overflow-hidden rounded-full bg-muted';
  const progressFillClass =
    'h-full rounded-[inherit] bg-primary transition-[width] duration-normal';
  const logClass =
    'min-h-20 w-full rounded-md border border-border bg-muted p-3 font-mono text-xs leading-4 text-muted-foreground';
  const fieldClass = 'grid w-full max-w-80 gap-1 text-sm leading-5 font-medium text-foreground';
  const inputClass =
    'min-h-control-lg rounded-md border border-border bg-background px-3 text-foreground outline-0 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring';
</script>

<script lang="ts">
  let logs = $state<string[]>([]);
  const addLog = (value: string) => {
    logs = [value, ...logs].slice(0, 4);
  };

  const defaultTour = useTour({ id: 'tour-default', steps: basicSteps });
  const arrowTour = useTour({ id: 'tour-arrow', steps: withArrowSteps });
  const mixedTour = useTour({ id: 'tour-mixed', steps: mixedSteps });
  const progressTour = useTour({ id: 'tour-progress', steps: basicSteps });
  const eventsTour = useTour({
    id: 'tour-events',
    steps: basicSteps,
    onStepChange: (details) => addLog('step: ' + details.stepId),
    onStatusChange: (details) => addLog('status: ' + details.status),
  });
  const inputTour = useTour({
    id: 'tour-input',
    steps: [
      {
        id: 'input',
        type: 'tooltip',
        title: 'Enter a name',
        description: 'The tour advances when the input has at least two characters.',
        target: () => document.querySelector<HTMLInputElement>('#tour-story-name'),
        effect({ next, show, target }) {
          show();
          const [promise, cancel] = waitForEvent<HTMLInputElement>(target, 'input', {
            predicate: (element) => element.value.trim().length >= 2,
          });
          promise.then(() => next());
          return cancel;
        },
      },
      {
        id: 'done',
        type: 'dialog',
        title: 'Input captured',
        description: 'Effects can wait for DOM interaction before moving on.',
        actions: [{ label: 'Done', action: 'dismiss' }],
        backdrop: true,
      },
    ],
  });
</script>

<Story name="Default" asChild>
  <div class={canvasClass}>
    <Button onclick={() => defaultTour().start()}>Start tour</Button>
    <div class={targetsClass}>
      <Button id="tour-story-upload" variant="outline">Upload</Button>
      <Button variant="outline">Save</Button>
    </div>
    <TourOverlay tour={defaultTour} />
  </div>
</Story>

<Story name="With Arrow" asChild>
  <div class={canvasClass}>
    <Button onclick={() => arrowTour().start()}>Start tour with arrow</Button>
    <div class={targetsClass}>
      <Button id="tour-story-upload" variant="outline">Upload</Button>
    </div>
    <TourOverlay tour={arrowTour} withArrow />
  </div>
</Story>

<Story name="Mixed Types" asChild>
  <div class={canvasClass}>
    <Button onclick={() => mixedTour().start()}>Start mixed tour</Button>
    <div id="tour-story-target" class={targetClass}>Target element</div>
    <TourOverlay tour={mixedTour} />
  </div>
</Story>

<Story name="Progress" asChild>
  <div class={canvasClass}>
    <Button onclick={() => progressTour().start()}>Start progress tour</Button>
    <Button id="tour-story-upload" variant="outline">Upload</Button>
    <Tour tour={progressTour} lazyMount unmountOnExit>
      <TourBackdrop />
      <TourSpotlight />
      <TourPositioner>
        <TourContent>
          <TourCloseIcon />
          <TourTitle />
          <TourDescription />
          <div class={progressTrackClass}>
            <div
              class={progressFillClass}
              style={'width: ' + progressTour().getProgressPercent() + '%'}
            ></div>
          </div>
          <TourControl><TourActionList /></TourControl>
        </TourContent>
      </TourPositioner>
    </Tour>
  </div>
</Story>

<Story name="Events" asChild>
  <div class={canvasClass}>
    <Button onclick={() => eventsTour().start()}>Start event tour</Button>
    <Button id="tour-story-upload" variant="outline">Upload</Button>
    <div class={logClass} aria-live="polite">
      {#if logs.length}
        {#each logs as log, index (log + index)}
          <div>{log}</div>
        {/each}
      {:else}
        No events yet
      {/if}
    </div>
    <TourOverlay tour={eventsTour} />
  </div>
</Story>

<Story name="Wait For Input" asChild>
  <div class={canvasClass}>
    <Button onclick={() => inputTour().start()}>Start input tour</Button>
    <label class={fieldClass}>
      Name
      <input id="tour-story-name" class={inputClass} />
    </label>
    <TourOverlay tour={inputTour} />
  </div>
</Story>