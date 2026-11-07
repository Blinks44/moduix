<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Timer,
    TimerArea,
    TimerContext,
    TimerItem,
    TimerRootProvider,
    TimerSegments,
    TimerSeparator,
    useTimer,
  } from '@/components/timer';
  import ShortTimerValue from './ShortTimerValue.svelte';
  import TimerControls from './TimerControls.svelte';
  import TimerItemGroup from './TimerItemGroup.svelte';

  const { Story } = defineMeta({
    title: 'Components/Timer',
    component: Timer,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const statusClass = 'm-0 text-sm leading-5 text-muted-foreground';
</script>

<script lang="ts">
  let ticks = $state(0);
  let complete = $state(false);
  let mode = $state<'work' | 'break'>('work');
  const timer = useTimer({ id: 'timer-root-provider', targetMs: 60 * 60 * 1000 });

  const toggleMode = () => {
    mode = mode === 'work' ? 'break' : 'work';
  };
</script>

<Story name="Basic" asChild>
  <Timer targetMs={60 * 60 * 1000} startMs={40 * 60 * 1000}>
    <TimerSegments />
    <TimerControls />
  </Timer>
</Story>

<Story name="Countdown" asChild>
  <Timer countdown startMs={10 * 60 * 1000}>
    <ShortTimerValue />
    <TimerControls />
  </Timer>
</Story>

<Story name="Interval" asChild>
  <Timer interval={100} targetMs={60 * 1000}>
    <TimerArea>
      <TimerItemGroup type="seconds" label="seconds" />
      <TimerSeparator>.</TimerSeparator>
      <TimerItemGroup type="milliseconds" label="ms" />
    </TimerArea>
    <TimerControls />
  </Timer>
</Story>

<Story name="Events" asChild>
  <Timer
    targetMs={10 * 1000}
    onTick={() => {
      ticks += 1;
    }}
    onComplete={() => {
      complete = true;
    }}
  >
    <TimerArea>
      <TimerItemGroup type="seconds" label="seconds" />
    </TimerArea>
    <TimerControls />
    <p class={statusClass}>
      Ticks: {ticks} / {complete ? 'Complete' : 'Running target'}
    </p>
  </Timer>
</Story>

<Story name="Pomodoro" asChild>
  {#key mode}
    <Timer
      countdown
      startMs={mode === 'work' ? 25 * 60 * 1000 : 5 * 60 * 1000}
      onComplete={toggleMode}
    >
      <p class={statusClass}>
        {mode === 'work' ? 'Focus session' : 'Break session'}
      </p>
      <ShortTimerValue />
      <TimerControls />
    </Timer>
  {/key}
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <TimerRootProvider value={timer}>
    <TimerContext>
      {#snippet render(api)}
        <p class={statusClass}>
          Progress: {(api().progressPercent * 100).toFixed(0)}%
        </p>
      {/snippet}
    </TimerContext>
    <ShortTimerValue />
    <TimerControls />
  </TimerRootProvider>
</Story>

<Story name="Custom Styling" exportName="CustomStyling" asChild>
  <Timer targetMs={15 * 60 * 1000}>
    <TimerArea class="text-3xl">
      <TimerItem class="text-primary" type="minutes" />
      <TimerSeparator class="text-chart-2">·</TimerSeparator>
      <TimerItem class="text-primary" type="seconds" />
    </TimerArea>
    <TimerControls actionClassName="border-transparent bg-muted" />
  </Timer>
</Story>