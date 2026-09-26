import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerControl,
  ColorPickerTrigger,
  ColorPickerPositioner,
  ColorPickerContent,
  ColorPickerArea,
  ColorPickerEyeDropperTrigger,
  ColorPickerTransparencyGrid,
  ColorPickerValueSwatch,
  ColorPickerValueText,
  ColorPickerSliders,
} from '@moduix/solid/color-picker';
import styles from '@/components/examples/color-picker/color-picker-compact-trigger.module.css';

export default function CompactTriggerColorPickerDemo() {
  return (
    <ColorPicker class={styles.root} defaultValue={parseColor('#eb5e41')}>
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerTrigger aria-label="Open color picker" data-fit-content>
          <span class={styles.triggerValue}>
            <span class={styles.triggerValueSwatch}>
              <ColorPickerTransparencyGrid />
              <ColorPickerValueSwatch />
            </span>
            <ColorPickerValueText format="hex" />
          </span>
        </ColorPickerTrigger>
      </ColorPickerControl>
      <ColorPickerPositioner>
        <ColorPickerContent>
          <ColorPickerArea />
          <div class={styles.sliderGroup}>
            <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" />
            <ColorPickerSliders />
          </div>
        </ColorPickerContent>
      </ColorPickerPositioner>
    </ColorPicker>
  );
}