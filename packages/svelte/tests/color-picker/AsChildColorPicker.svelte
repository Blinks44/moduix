<script lang="ts">
  import {
    ColorPicker,
    ColorPickerChannelInput,
    ColorPickerHiddenInput,
    parseColor,
  } from '@/components/color-picker';

  const defaultColor = parseColor('#eb5e41');
  let rootRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ rootRef });
</script>

<form>
  <ColorPicker bind:ref={rootRef} defaultValue={defaultColor} name="accent">
    {#snippet asChild(props)}
      <div {...props()} data-testid="color-picker-root">
        <ColorPickerChannelInput channel="hex" />
        <ColorPickerHiddenInput />
      </div>
    {/snippet}
  </ColorPicker>
</form>