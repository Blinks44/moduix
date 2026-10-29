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
} from '@moduix/solid/color-picker';
import { Stack } from '@moduix/solid/stack';

export default function RootProviderColorPickerDemo() {
  const colorPicker = useColorPicker({ defaultValue: parseColor('#9333ea') });

  return (
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
  );
}