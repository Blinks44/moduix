<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    ProgressCircular,
    ProgressCircularCircle,
    ProgressCircularCircleRange,
    ProgressCircularCircleTrack,
    ProgressCircularContext,
    ProgressCircularLabel,
    ProgressCircularRing,
    ProgressCircularRootProvider,
    ProgressCircularValueText,
    useProgress,
  } from '@/components/progress-circular';
  import {
    Slider,
    SliderControl,
    SliderHiddenInput,
    SliderLabel,
    SliderRange,
    SliderThumb,
    SliderTrack,
    SliderValueText,
  } from '@/components/slider';
  import CircularParts from './CircularParts.svelte';

  const { Story } = defineMeta({
    title: 'Components/ProgressCircular',
    component: ProgressCircular,
    tags: ['autodocs'],
    args: { defaultValue: 42 },
    parameters: { layout: 'centered' },
  });

  const translations = {
    value: ({ value, max }: { value: number | null; max: number }) =>
      value === null ? 'Migration: loading' : `Migration: ${value} of ${max}`,
  };
</script>

<script lang="ts">
  let value: number | null = $state(42);
  const progress = useProgress({ id: 'progress-circular-root-provider', defaultValue: 58 });
</script>

<Story name="Basic" asChild>
  <ProgressCircular defaultValue={42}>
    <ProgressCircularLabel>Export data</ProgressCircularLabel>
    <CircularParts aria-label="Export data" />
  </ProgressCircular>
</Story>

<Story name="Controlled" asChild>
  <div class="grid justify-items-center gap-4">
    <ProgressCircular bind:value>
      <ProgressCircularLabel>Upload status</ProgressCircularLabel>
      <CircularParts aria-label="Upload status" />
    </ProgressCircular>
    <Slider
      class="w-48"
      value={[value ?? 0]}
      min={0}
      max={100}
      onValueChange={(details) => (value = details.value[0] ?? 0)}
    >
      <SliderLabel>Progress value</SliderLabel>
      <SliderValueText />
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0} aria-label="Progress value">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
  </div>
</Story>

<Story name="Initial Value" asChild>
  <ProgressCircular defaultValue={70}>
    <ProgressCircularLabel>Import data</ProgressCircularLabel>
    <CircularParts aria-label="Import data" />
  </ProgressCircular>
</Story>

<Story name="Min Max Range" asChild>
  <ProgressCircular defaultValue={420} min={200} max={800}>
    <ProgressCircularLabel>Requests per minute</ProgressCircularLabel>
    <CircularParts aria-label="Requests per minute" />
  </ProgressCircular>
</Story>

<Story name="Indeterminate" asChild>
  <ProgressCircular
    class="[&_[data-slot=progress-circular-circle-range]]:stroke-chart-4"
    defaultValue={null}
  >
    <ProgressCircularLabel>Preparing report</ProgressCircularLabel>
    <CircularParts aria-label="Preparing report" />
  </ProgressCircular>
</Story>

<Story name="Value Text" asChild>
  <ProgressCircular {translations}>
    <ProgressCircularLabel>Migration</ProgressCircularLabel>
    <ProgressCircularRing />
    <ProgressCircularContext>
      {#snippet render(state)}
        <ProgressCircularValueText>{state().valueAsString}</ProgressCircularValueText>
      {/snippet}
    </ProgressCircularContext>
  </ProgressCircular>
</Story>

<Story name="Root Provider" asChild>
  <ProgressCircularRootProvider value={progress}>
    <ProgressCircularLabel>Team rollout</ProgressCircularLabel>
    <CircularParts aria-label="Team rollout" />
  </ProgressCircularRootProvider>
</Story>

<Story name="Custom Styles" asChild>
  <ProgressCircular defaultValue={72}>
    <ProgressCircularLabel>Monthly quota</ProgressCircularLabel>
    <div class="relative inline-grid place-items-center">
      <ProgressCircularCircle
        class="col-start-1 row-start-1 [--size:4rem] [--thickness:0.4rem]"
        aria-label="Monthly quota"
      >
        <ProgressCircularCircleTrack class="stroke-primary/25" />
        <ProgressCircularCircleRange
          class="stroke-chart-2 drop-shadow-[0_0_0.25rem_color-mix(in_oklab,var(--color-chart-2),transparent_45%)]"
        />
      </ProgressCircularCircle>
      <ProgressCircularValueText class="col-start-1 row-start-1" />
    </div>
  </ProgressCircular>
</Story>