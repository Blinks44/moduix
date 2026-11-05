<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    AngleSlider,
    AngleSliderDial,
    AngleSliderHiddenInput,
    AngleSliderControl,
    AngleSliderLabel,
    AngleSliderMarker,
    AngleSliderMarkerGroup,
    AngleSliderRootProvider,
    AngleSliderThumb,
    AngleSliderValueText,
    useAngleSlider,
  } from '@/components/angle-slider';
  import AngleSliderMarkedParts from './AngleSliderMarkedParts.svelte';

  const { Story } = defineMeta({
    title: 'Components/AngleSlider',
    component: AngleSlider,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const markerValues = Array.from({ length: 8 }, (_, index) => index * 45);
  const customControlClass = 'w-40 [--_angle-slider-fill:var(--color-chart-4)]';
  const customThumbClass = 'before:size-[1.125rem] before:border-chart-4';
  const customMarkerClass =
    'before:bg-[color-mix(in_oklab,var(--color-chart-4)_18%,var(--color-border))] data-[state=under-value]:before:bg-[color-mix(in_oklab,var(--color-chart-4)_65%,var(--color-foreground))]';
  const demoRootClass = '[&_[data-slot=angle-slider-control]]:w-36';
  const formClass = 'grid justify-items-center gap-3';
  const formActionsClass = 'flex flex-wrap items-center justify-center gap-2';
  const providerLayoutClass = 'flex items-center gap-8';
  const providerButtonClass =
    'min-h-10 cursor-pointer rounded-md border border-border bg-background px-4 text-foreground [font:inherit] hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';
  const stressRootClass = 'max-w-48 [&_[data-slot=angle-slider-control]]:w-36';
</script>

<script lang="ts">
  let value = $state(210);
  let submitted = $state('Nothing submitted');
  const angleSlider = useAngleSlider({
    id: 'root-provider-angle-slider',
    defaultValue: 45,
    'aria-label': 'Rotation',
  });
</script>

<Story name="Basic" asChild>
  <AngleSlider defaultValue={135} aria-label="Rotation" class={demoRootClass}>
    <AngleSliderDial />
    <AngleSliderHiddenInput />
  </AngleSlider>
</Story>

<Story name="As Child" exportName="AsChild" asChild>
  <AngleSlider defaultValue={135} aria-label="Rotation">
    {#snippet asChild(props)}
      <div {...props({ class: demoRootClass })}>
        <AngleSliderDial />
        <AngleSliderHiddenInput />
      </div>
    {/snippet}
  </AngleSlider>
</Story>

<Story name="Controlled" asChild>
  <AngleSlider bind:value aria-label="Heading" class={demoRootClass}>
    <AngleSliderLabel>Heading</AngleSliderLabel>
    <AngleSliderMarkedParts />
  </AngleSlider>
</Story>

<Story name="Disabled" asChild>
  <AngleSlider defaultValue={45} disabled aria-label="Disabled rotation" class={demoRootClass}>
    <AngleSliderLabel>Rotation</AngleSliderLabel>
    <AngleSliderMarkedParts />
  </AngleSlider>
</Story>

<Story name="Form" asChild>
  <form
    class={formClass}
    onreset={() => (submitted = 'Nothing submitted')}
    onsubmit={(event) => {
      event.preventDefault();
      submitted = `${String(new FormData(event.currentTarget).get('rotation') ?? '')}°`;
    }}
  >
    <AngleSlider defaultValue={135} aria-label="Rotation" name="rotation" class={demoRootClass}>
      <AngleSliderLabel>Rotation</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
    <div class={formActionsClass}>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
      <output>Submitted: {submitted}</output>
    </div>
  </form>
</Story>

<Story name="Invalid" asChild>
  <AngleSlider defaultValue={315} invalid aria-label="Invalid heading" class={demoRootClass}>
    <AngleSliderLabel>Heading</AngleSliderLabel>
    <AngleSliderMarkedParts />
  </AngleSlider>
</Story>

<Story name="Read Only" asChild>
  <AngleSlider defaultValue={300} readOnly aria-label="Locked angle" class={demoRootClass}>
    <AngleSliderLabel>Locked angle</AngleSliderLabel>
    <AngleSliderMarkedParts />
  </AngleSlider>
</Story>

<Story name="Root Provider" asChild>
  <div class={providerLayoutClass}>
    <AngleSliderRootProvider value={angleSlider} class={demoRootClass}>
      <AngleSliderLabel>Rotation</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSliderRootProvider>
    <button type="button" class={providerButtonClass} onclick={() => angleSlider().setValue(90)}>
      Set to 90°
    </button>
  </div>
</Story>

<Story name="Steps" asChild>
  <AngleSlider defaultValue={60} step={15} aria-label="Snap angle" class={demoRootClass}>
    <AngleSliderLabel>Snap angle</AngleSliderLabel>
    <AngleSliderMarkedParts />
  </AngleSlider>
</Story>

<Story name="With Marks" asChild>
  <AngleSlider defaultValue={135} aria-label="Rotation" class={demoRootClass}>
    <AngleSliderLabel>Rotation</AngleSliderLabel>
    <AngleSliderMarkedParts />
  </AngleSlider>
</Story>

<Story name="Content Stress" asChild>
  <AngleSlider
    defaultValue={225}
    aria-label="Direction of the primary studio spotlight"
    class={stressRootClass}
  >
    <AngleSliderLabel>Direction of the primary studio spotlight</AngleSliderLabel>
    <AngleSliderMarkedParts />
  </AngleSlider>
</Story>

<Story name="Custom Styling" asChild>
  <AngleSlider defaultValue={45} aria-label="Compass heading">
    <AngleSliderLabel>Compass</AngleSliderLabel>
    <AngleSliderControl class={customControlClass}>
      <AngleSliderValueText />
      <AngleSliderMarkerGroup>
        {#each markerValues as value (value)}
          <AngleSliderMarker {value} class={customMarkerClass} />
        {/each}
      </AngleSliderMarkerGroup>
      <AngleSliderThumb class={customThumbClass} />
    </AngleSliderControl>
    <AngleSliderHiddenInput />
  </AngleSlider>
</Story>