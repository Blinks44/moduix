import { ColorPicker, parseColor } from '@moduix/solid/color-picker';
import styles from '@/components/examples/color-picker/color-picker-compact-trigger.module.css';

export default function CompactTriggerColorPickerDemo() {
  return (
    <ColorPicker class={styles.root} defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Trigger aria-label="Open color picker" data-fit-content>
          <span class={styles.triggerValue}>
            <span class={styles.triggerValueSwatch}>
              <ColorPicker.TransparencyGrid />
              <ColorPicker.ValueSwatch />
            </span>
            <ColorPicker.ValueText format="hex" />
          </span>
        </ColorPicker.Trigger>
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area />
          <div class={styles.sliderGroup}>
            <ColorPicker.EyeDropperTrigger aria-label="Pick color from screen" />
            <ColorPicker.Sliders />
          </div>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
    </ColorPicker>
  );
}