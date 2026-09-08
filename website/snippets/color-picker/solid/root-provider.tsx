import { ColorPicker, parseColor, useColorPicker } from '@moduix/solid/color-picker';
import styles from '@/components/examples/color-picker/color-picker-root-provider.module.css';

export default function RootProviderColorPickerDemo() {
  const colorPicker = useColorPicker({ defaultValue: parseColor('#9333ea') });

  return (
    <ColorPicker.RootProvider value={colorPicker}>
      <div class={styles.valueRow}>
        <ColorPicker.Label>Provider color</ColorPicker.Label>
        <ColorPicker.ValueText format="hex" />
      </div>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.Trigger aria-label="Open color picker" />
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area />
        </ColorPicker.Content>
      </ColorPicker.Positioner>
    </ColorPicker.RootProvider>
  );
}