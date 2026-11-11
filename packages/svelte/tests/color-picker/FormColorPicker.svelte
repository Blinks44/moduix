<script lang="ts">
  import {
    ColorPicker,
    ColorPickerChannelInput,
    ColorPickerHiddenInput,
    ColorPickerRootProvider,
    parseColor,
    useColorPicker,
  } from '@/components/color-picker';

  const defaultColor = parseColor('#eb5e41');
  const colorPicker = useColorPicker({
    id: 'provider-color-picker',
    defaultValue: parseColor('#2563eb'),
    name: 'provider-accent',
  });
</script>

<form>
  <ColorPicker defaultValue={defaultColor} name="accent">
    <ColorPickerChannelInput channel="hex" />
    <ColorPickerHiddenInput />
  </ColorPicker>
  <ColorPickerRootProvider value={colorPicker}>
    <ColorPickerChannelInput channel="hex" />
    <ColorPickerHiddenInput />
  </ColorPickerRootProvider>
</form>