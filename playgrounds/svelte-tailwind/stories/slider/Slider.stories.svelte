<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import {
    Slider,
    SliderControl,
    SliderDraggingIndicator,
    SliderHiddenInput,
    SliderLabel,
    SliderMarker,
    SliderMarkerGroup,
    SliderRange,
    SliderRootProvider,
    SliderThumb,
    SliderThumbs,
    SliderTrack,
    SliderValueText,
    useSlider,
  } from '@/components/slider';
  import SliderContextStatus from './SliderContextStatus.svelte';

  const { Story } = defineMeta({
    title: 'Components/Slider',
    component: Slider,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const headerClass = 'flex items-center justify-between gap-3';
  const verticalContainerClass = 'flex h-56';
  const verticalSliderClass = 'h-48 w-auto';
  const stackClass = 'grid gap-4';
  const customSliderClass = 'w-64';
  const customControlClass = 'min-h-6';
  const customTrackClass =
    'h-2.5 bg-[color-mix(in_oklab,var(--color-chart-4)_18%,var(--color-muted))] ring-0';
  const customRangeClass = 'bg-chart-4';
  const customThumbClass = 'size-5 border-background bg-chart-4';
</script>

<script lang="ts">
  let controlled = $state([24]);
  let range = $state([20, 70]);
  const slider = useSlider({ id: 'root-provider-slider', defaultValue: [40] });
</script>

<Story name="Basic" asChild>
  <Slider defaultValue={[40]}>
    <div class={headerClass}>
      <SliderLabel>Volume</SliderLabel>
      <SliderValueText />
    </div>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb index={0} aria-label="Volume">
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </Slider>
</Story>

<Story name="Controlled" asChild>
  <Slider bind:value={controlled}>
    <div class={headerClass}>
      <SliderLabel>Brightness</SliderLabel>
      <SliderValueText />
    </div>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb index={0} aria-label="Brightness">
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </Slider>
</Story>

<Story name="Range" asChild>
  <Slider bind:value={range} min={0} max={100}>
    <SliderLabel>Price range</SliderLabel>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb index={0} aria-label="Minimum price">
        <SliderHiddenInput />
      </SliderThumb>
      <SliderThumb index={1} aria-label="Maximum price">
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
    <SliderValueText />
  </Slider>
</Story>

<Story name="Steps And Constraints" asChild>
  <Slider
    defaultValue={[250, 750]}
    min={0}
    max={1000}
    step={50}
    minStepsBetweenThumbs={2}
    thumbCollisionBehavior="push"
    getAriaValueText={(details) => `$${details.value}`}
  >
    <div class={headerClass}>
      <SliderLabel>Budget</SliderLabel>
      <SliderValueText />
    </div>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb index={0} aria-label="Minimum budget">
        <SliderHiddenInput />
      </SliderThumb>
      <SliderThumb index={1} aria-label="Maximum budget">
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </Slider>
</Story>

<Story name="Marks" asChild>
  <Slider defaultValue={[50]}>
    <div class={headerClass}>
      <SliderLabel>Progress</SliderLabel>
      <SliderValueText />
    </div>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb index={0} aria-label="Progress">
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
    <SliderMarkerGroup>
      {#each [0, 25, 50, 75, 100] as value (value)}
        <SliderMarker {value}>{value}</SliderMarker>
      {/each}
    </SliderMarkerGroup>
  </Slider>
</Story>

<Story name="Dragging Indicator" asChild>
  <Slider defaultValue={[40]}>
    <SliderLabel>Gain</SliderLabel>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb index={0} aria-label="Gain">
        <SliderDraggingIndicator />
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </Slider>
</Story>

<Story name="Vertical" asChild>
  <div class={verticalContainerClass}>
    <Slider orientation="vertical" defaultValue={[60]} class={verticalSliderClass}>
      <SliderLabel>Output</SliderLabel>
      <SliderValueText />
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0} aria-label="Output">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
  </div>
</Story>

<Story name="Vertical With Marks" asChild>
  <Slider orientation="vertical" defaultValue={[50]} class={verticalSliderClass}>
    <SliderLabel>Output</SliderLabel>
    <SliderValueText />
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumbs />
    </SliderControl>
    <SliderMarkerGroup>
      {#each [0, 25, 50, 75, 100] as value (value)}
        <SliderMarker {value}>{value}</SliderMarker>
      {/each}
    </SliderMarkerGroup>
  </Slider>
</Story>

<Story name="Disabled" asChild>
  <Slider defaultValue={[32]} disabled>
    <div class={headerClass}>
      <SliderLabel>Notifications</SliderLabel>
      <SliderValueText />
    </div>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb index={0} aria-label="Notifications">
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </Slider>
</Story>

<Story name="Invalid" asChild>
  <Slider defaultValue={[32]} invalid>
    <div class={headerClass}>
      <SliderLabel>Invalid volume</SliderLabel>
      <SliderValueText />
    </div>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumbs />
    </SliderControl>
    <SliderMarkerGroup>
      {#each [0, 50, 100] as value (value)}
        <SliderMarker {value}>{value}</SliderMarker>
      {/each}
    </SliderMarkerGroup>
  </Slider>
</Story>

<Story name="Read Only" asChild>
  <Slider defaultValue={[32]} readOnly>
    <div class={headerClass}>
      <SliderLabel>Read-only volume</SliderLabel>
      <SliderValueText />
    </div>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumbs />
    </SliderControl>
  </Slider>
</Story>

<Story name="Context" asChild>
  <Slider defaultValue={[40]}>
    <SliderContextStatus />
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb index={0} aria-label="Context value">
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </Slider>
</Story>

<Story name="Root Provider" asChild>
  <div class={stackClass}>
    <Button onclick={() => slider().focus()}>Focus</Button>
    <SliderRootProvider value={slider}>
      <SliderLabel>Volume</SliderLabel>
      <SliderValueText />
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0} aria-label="Volume">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </SliderRootProvider>
  </div>
</Story>

<Story name="As Child" exportName="AsChild" asChild>
  <Slider defaultValue={[40]}>
    {#snippet asChild(props)}
      <section {...props()}>
        <div class={headerClass}>
          <SliderLabel>Volume</SliderLabel>
          <SliderValueText />
        </div>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0} aria-label="Volume">
            {#snippet asChild(thumbProps)}
              <span {...thumbProps()}>
                <SliderHiddenInput />
              </span>
            {/snippet}
          </SliderThumb>
        </SliderControl>
      </section>
    {/snippet}
  </Slider>
</Story>

<Story name="Custom Styling" asChild>
  <Slider defaultValue={[56]} class={customSliderClass}>
    <SliderLabel>Temperature</SliderLabel>
    <SliderValueText />
    <SliderControl class={customControlClass}>
      <SliderTrack class={customTrackClass}>
        <SliderRange class={customRangeClass} />
      </SliderTrack>
      <SliderThumb index={0} aria-label="Temperature" class={customThumbClass}>
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </Slider>
</Story>