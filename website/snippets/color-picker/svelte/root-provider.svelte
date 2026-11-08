<script lang="ts">
  import {
    parseColor,
    useColorPicker,
    ColorPickerRootProvider,
    ColorPickerLabel,
    ColorPickerControl,
    ColorPickerTrigger,
    ColorPickerPositioner,
    ColorPickerContent,
    ColorPickerArea,
    ColorPickerChannelInput,
    ColorPickerValueText,
  } from '@moduix/svelte/color-picker';
  import { Stack } from '@moduix/svelte/stack';

  const id = $props.id();
  const colorPicker = useColorPicker({ id, defaultValue: parseColor('#9333ea') });
</script>

<ColorPickerRootProvider value={colorPicker}>
  <Stack direction="row" align="center" justify="space-between" gap="3">
    <ColorPickerLabel>Provider color</ColorPickerLabel>
    <ColorPickerValueText format="hex" />
  </Stack>
  <ColorPickerControl>
    <ColorPickerChannelInput channel="hex" />
    <ColorPickerTrigger aria-label="Open color picker" />
  </ColorPickerControl>
  <ColorPickerPositioner>
    <ColorPickerContent>
      <ColorPickerArea />
    </ColorPickerContent>
  </ColorPickerPositioner>
</ColorPickerRootProvider>