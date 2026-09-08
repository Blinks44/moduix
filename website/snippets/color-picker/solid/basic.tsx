import { ColorPicker, parseColor } from '@moduix/solid/color-picker';
import styles from '@/components/examples/color-picker/color-picker-basic.module.css';

const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];

export default function ColorPickerDemo() {
  return (
    <ColorPicker defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.Trigger aria-label="Open color picker" />
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area />
          <div class={styles.sliderGroup}>
            <ColorPicker.EyeDropperTrigger aria-label="Pick color from screen" />
            <ColorPicker.Sliders />
          </div>
          <ColorPicker.SwatchGroup>
            {swatches.map((color) => (
              <ColorPicker.SwatchTrigger value={color} />
            ))}
          </ColorPicker.SwatchGroup>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
      <ColorPicker.HiddenInput />
    </ColorPicker>
  );
}