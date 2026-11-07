<script lang="ts">
  import {
    ColorPicker,
    ColorPickerChannelInput,
    ColorPickerContext,
    ColorPickerControl,
    parseColor,
    type ColorPickerColor,
    type ColorPickerValueChangeDetails,
  } from '@/components/color-picker';

  let { onValueChange }: { onValueChange?: (details: ColorPickerValueChangeDetails) => void } =
    $props();

  let value = $state<ColorPickerColor>(parseColor('#16a34a'));
</script>

<div>
  <ColorPicker bind:value portalled={false} {onValueChange}>
    <ColorPickerControl>
      <ColorPickerChannelInput channel="hex" />
    </ColorPickerControl>
    <ColorPickerContext>
      {#snippet render(colorPicker)}
        <button type="button" onclick={() => colorPicker().setValue('#9333ea')}>
          Change color
        </button>
      {/snippet}
    </ColorPickerContext>
  </ColorPicker>
  <output>{value.toString()}</output>
</div>