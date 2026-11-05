<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    AngleSlider,
    AngleSliderDial,
    AngleSliderHiddenInput,
    AngleSliderLabel,
    AngleSliderRootProvider,
    useAngleSlider,
  } from '@/components/angle-slider';
  import styles from './AngleSlider.stories.module.css';
  import AngleSliderMarkedParts from './AngleSliderMarkedParts.svelte';

  const { Story } = defineMeta({
    title: 'Components/AngleSlider',
    component: AngleSlider,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
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
  <AngleSlider defaultValue={135} aria-label="Rotation" class={styles.demoRoot}>
    <AngleSliderDial />
    <AngleSliderHiddenInput />
  </AngleSlider>
</Story>

<Story name="As Child" exportName="AsChild" asChild>
  <AngleSlider defaultValue={135} aria-label="Rotation">
    {#snippet asChild(props)}
      <div {...props({ class: styles.demoRoot })}>
        <AngleSliderDial />
        <AngleSliderHiddenInput />
      </div>
    {/snippet}
  </AngleSlider>
</Story>

<Story name="Controlled" asChild>
  <AngleSlider bind:value aria-label="Heading" class={styles.demoRoot}>
    <AngleSliderLabel>Heading</AngleSliderLabel>
    <AngleSliderMarkedParts />
  </AngleSlider>
</Story>

<Story name="Disabled" asChild>
  <AngleSlider defaultValue={45} disabled aria-label="Disabled rotation" class={styles.demoRoot}>
    <AngleSliderLabel>Rotation</AngleSliderLabel>
    <AngleSliderMarkedParts />
  </AngleSlider>
</Story>

<Story name="Form" asChild>
  <form
    class={styles.form}
    onreset={() => (submitted = 'Nothing submitted')}
    onsubmit={(event) => {
      event.preventDefault();
      submitted = `${String(new FormData(event.currentTarget).get('rotation') ?? '')}°`;
    }}
  >
    <AngleSlider defaultValue={135} aria-label="Rotation" name="rotation" class={styles.demoRoot}>
      <AngleSliderLabel>Rotation</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
    <div class={styles.formActions}>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
      <output>Submitted: {submitted}</output>
    </div>
  </form>
</Story>

<Story name="Invalid" asChild>
  <AngleSlider defaultValue={315} invalid aria-label="Invalid heading" class={styles.demoRoot}>
    <AngleSliderLabel>Heading</AngleSliderLabel>
    <AngleSliderMarkedParts />
  </AngleSlider>
</Story>

<Story name="Read Only" asChild>
  <AngleSlider defaultValue={300} readOnly aria-label="Locked angle" class={styles.demoRoot}>
    <AngleSliderLabel>Locked angle</AngleSliderLabel>
    <AngleSliderMarkedParts />
  </AngleSlider>
</Story>

<Story name="Root Provider" asChild>
  <div class={styles.providerLayout}>
    <AngleSliderRootProvider value={angleSlider} class={styles.demoRoot}>
      <AngleSliderLabel>Rotation</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSliderRootProvider>
    <button type="button" class={styles.providerButton} onclick={() => angleSlider().setValue(90)}>
      Set to 90°
    </button>
  </div>
</Story>

<Story name="Steps" asChild>
  <AngleSlider defaultValue={60} step={15} aria-label="Snap angle" class={styles.demoRoot}>
    <AngleSliderLabel>Snap angle</AngleSliderLabel>
    <AngleSliderMarkedParts />
  </AngleSlider>
</Story>

<Story name="With Marks" asChild>
  <AngleSlider defaultValue={135} aria-label="Rotation" class={styles.demoRoot}>
    <AngleSliderLabel>Rotation</AngleSliderLabel>
    <AngleSliderMarkedParts />
  </AngleSlider>
</Story>

<Story name="Content Stress" asChild>
  <AngleSlider
    defaultValue={225}
    aria-label="Direction of the primary studio spotlight"
    class={styles.stressRoot}
  >
    <AngleSliderLabel>Direction of the primary studio spotlight</AngleSliderLabel>
    <AngleSliderMarkedParts />
  </AngleSlider>
</Story>

<Story name="Custom Styling" asChild>
  <AngleSlider defaultValue={45} aria-label="Compass heading" class={styles.customRoot}>
    <AngleSliderLabel>Compass</AngleSliderLabel>
    <AngleSliderMarkedParts />
  </AngleSlider>
</Story>