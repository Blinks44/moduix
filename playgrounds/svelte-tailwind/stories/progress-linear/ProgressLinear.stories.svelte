<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    ProgressLinear,
    ProgressLinearContext,
    ProgressLinearLabel,
    ProgressLinearRange,
    ProgressLinearRootProvider,
    ProgressLinearTrack,
    ProgressLinearValueText,
    useProgress,
  } from '@/components/progress-linear';
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

  const { Story } = defineMeta({
    title: 'Components/ProgressLinear',
    component: ProgressLinear,
    tags: ['autodocs'],
    args: { defaultValue: 24 },
    parameters: { layout: 'centered' },
  });

  const translations = {
    value: ({ value, max }: { value: number | null; max: number }) =>
      value === null ? 'Loading...' : `${value} of ${max} items loaded`,
  };
</script>

<script lang="ts">
  let value: number | null = $state(45);
  const progress = useProgress({ id: 'progress-linear-root-provider', defaultValue: 58 });
</script>

<Story name="Basic" asChild>
  <ProgressLinear defaultValue={24}>
    <ProgressLinearLabel>Export data</ProgressLinearLabel>
    <ProgressLinearValueText />
    <ProgressLinearTrack aria-label="Export data">
      <ProgressLinearRange />
    </ProgressLinearTrack>
  </ProgressLinear>
</Story>

<Story name="Controlled" asChild>
  <div class="grid gap-4">
    <ProgressLinear bind:value>
      <ProgressLinearLabel>Upload status</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack aria-label="Upload status">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
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
  <ProgressLinear defaultValue={70}>
    <ProgressLinearLabel>Import data</ProgressLinearLabel>
    <ProgressLinearValueText />
    <ProgressLinearTrack aria-label="Import data">
      <ProgressLinearRange />
    </ProgressLinearTrack>
  </ProgressLinear>
</Story>

<Story name="Min Max Range" asChild>
  <ProgressLinear defaultValue={420} min={200} max={800}>
    <ProgressLinearLabel>Requests per minute</ProgressLinearLabel>
    <ProgressLinearValueText />
    <ProgressLinearTrack aria-label="Requests per minute">
      <ProgressLinearRange />
    </ProgressLinearTrack>
  </ProgressLinear>
</Story>

<Story name="Indeterminate" asChild>
  <ProgressLinear defaultValue={null}>
    <ProgressLinearLabel>Preparing report</ProgressLinearLabel>
    <ProgressLinearValueText />
    <ProgressLinearTrack aria-label="Preparing report">
      <ProgressLinearRange />
    </ProgressLinearTrack>
  </ProgressLinear>
</Story>

<Story name="Vertical" asChild>
  <ProgressLinear defaultValue={42} orientation="vertical" class="data-[orientation=vertical]:h-40">
    <ProgressLinearLabel>Indexing files</ProgressLinearLabel>
    <ProgressLinearValueText />
    <ProgressLinearTrack aria-label="Indexing files">
      <ProgressLinearRange />
    </ProgressLinearTrack>
  </ProgressLinear>
</Story>

<Story name="Value Text" asChild>
  <ProgressLinear {translations}>
    <ProgressLinearLabel>Migration</ProgressLinearLabel>
    <ProgressLinearContext>
      {#snippet render(state)}
        <ProgressLinearValueText>{state().valueAsString}</ProgressLinearValueText>
      {/snippet}
    </ProgressLinearContext>
    <ProgressLinearTrack aria-label="Migration">
      <ProgressLinearRange />
    </ProgressLinearTrack>
  </ProgressLinear>
</Story>

<Story name="Root Provider" asChild>
  <ProgressLinearRootProvider value={progress}>
    <ProgressLinearLabel>Team rollout</ProgressLinearLabel>
    <ProgressLinearValueText />
    <ProgressLinearTrack
      class="h-4 rounded-md bg-background ring-1 ring-chart-3/55 ring-inset"
      aria-label="Team rollout"
    >
      <ProgressLinearRange class="rounded-[inherit] bg-linear-to-r from-chart-3 to-primary" />
    </ProgressLinearTrack>
  </ProgressLinearRootProvider>
</Story>

<Story name="Custom Styles" asChild>
  <ProgressLinear defaultValue={72} class="w-64">
    <ProgressLinearLabel>Monthly quota</ProgressLinearLabel>
    <ProgressLinearValueText />
    <ProgressLinearTrack
      class="h-3 bg-accent ring-2 ring-primary/25 ring-inset"
      aria-label="Monthly quota"
    >
      <ProgressLinearRange class="bg-linear-to-r from-primary to-chart-2" />
    </ProgressLinearTrack>
  </ProgressLinear>
</Story>