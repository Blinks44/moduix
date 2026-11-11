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
  import styles from './Slider.stories.module.css';
  import SliderContextStatus from './SliderContextStatus.svelte';

  const { Story } = defineMeta({
    title: 'Components/Slider',
    component: Slider,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let controlled = $state([24]);
  let range = $state([20, 70]);
  const slider = useSlider({ id: 'root-provider-slider', defaultValue: [40] });
</script>

<Story name="Basic" asChild>
  <Slider defaultValue={[40]}>
    <div class={styles.header}>
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
    <div class={styles.header}>
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
    <div class={styles.header}>
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
    <div class={styles.header}>
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
  <div class={styles.verticalContainer}>
    <Slider orientation="vertical" defaultValue={[60]} class={styles.verticalSlider}>
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
  <Slider orientation="vertical" defaultValue={[50]} class={styles.verticalSlider}>
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
    <div class={styles.header}>
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
    <div class={styles.header}>
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
    <div class={styles.header}>
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
  <div class={styles.stack}>
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
        <div class={styles.header}>
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
  <Slider defaultValue={[56]} class={styles.customSlider}>
    <SliderLabel>Temperature</SliderLabel>
    <SliderValueText />
    <SliderControl class={styles.customControl}>
      <SliderTrack class={styles.customTrack}>
        <SliderRange class={styles.customRange} />
      </SliderTrack>
      <SliderThumb index={0} aria-label="Temperature" class={styles.customThumb}>
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </Slider>
</Story>