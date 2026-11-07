<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    ColorPicker,
    ColorPickerLabel,
    ColorPickerRootProvider,
    ColorPickerValueText,
    parseColor,
    useColorPicker,
    type ColorPickerColor,
  } from '@/components/color-picker';
  import styles from './ColorPicker.stories.module.css';
  import ColorPickerField from './ColorPickerField.svelte';
  import CompactTriggerPicker from './CompactTriggerPicker.svelte';
  import InlinePicker from './InlinePicker.svelte';

  const { Story } = defineMeta({
    title: 'Components/ColorPicker',
    component: ColorPicker,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const customSwatches = ['#0ea5e9', '#14b8a6', '#84cc16', '#f59e0b'];
</script>

<script lang="ts">
  let value = $state<ColorPickerColor>(parseColor('#16a34a'));
  const colorPicker = useColorPicker({
    id: 'color-picker-root-provider',
    defaultValue: parseColor('#9333ea'),
  });
</script>

<Story name="Basic" asChild>
  <ColorPicker class={styles.demoRoot} defaultValue={parseColor('#eb5e41')}>
    <ColorPickerField />
  </ColorPicker>
</Story>

<Story name="Controlled" asChild>
  <ColorPicker class={styles.demoRoot} bind:value>
    <ColorPickerField />
  </ColorPicker>
</Story>

<Story name="Inline" asChild>
  <InlinePicker />
</Story>

<Story name="Compact Trigger" exportName="CompactTrigger" asChild>
  <CompactTriggerPicker />
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <ColorPickerRootProvider class={styles.demoRoot} value={colorPicker}>
    <div class={styles.valueRow}>
      <ColorPickerLabel>Provider color</ColorPickerLabel>
      <ColorPickerValueText format="hex" />
    </div>
    <ColorPickerField />
  </ColorPickerRootProvider>
</Story>

<Story name="Custom Styling" exportName="CustomStyling" asChild>
  <ColorPicker class={styles.customRoot} defaultValue={parseColor('#0ea5e9')}>
    <ColorPickerField swatchList={customSwatches} />
  </ColorPicker>
</Story>