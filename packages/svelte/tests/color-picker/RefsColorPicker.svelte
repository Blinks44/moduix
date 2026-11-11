<script lang="ts">
  import {
    ColorPicker,
    ColorPickerControl,
    ColorPickerTrigger,
    parseColor,
  } from '@/components/color-picker';

  const defaultColor = parseColor('#eb5e41');
  let rootRef = $state<HTMLElement | null>(null);
  let controlRef = $state<HTMLElement | null>(null);
  let triggerRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ controlRef, rootRef, triggerRef });
</script>

<ColorPicker bind:ref={rootRef} defaultValue={defaultColor}>
  <ColorPickerControl bind:ref={controlRef}>
    <ColorPickerTrigger bind:ref={triggerRef} aria-label="Open" />
  </ColorPickerControl>
</ColorPicker>