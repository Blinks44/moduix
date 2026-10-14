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
  ColorPickerValueSwatch,
  ColorPickerValueText,
  ColorPickerSliders,
} from '@moduix/react/color-picker';
import styles from '@/components/examples/color-picker/color-picker-compact-trigger.module.css';

export default function CompactTriggerColorPickerDemo() {
  return (
    <ColorPicker className={styles.root} defaultValue={parseColor('#eb5e41')}>
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerTrigger aria-label="Open color picker" data-fit-content>
          <ColorPickerValueSwatch />
          <ColorPickerValueText format="hex" />
        </ColorPickerTrigger>
      </ColorPickerControl>
      <ColorPickerPositioner>
        <ColorPickerContent>
          <ColorPickerArea />
          <div className={styles.sliderGroup}>
            <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" />
            <ColorPickerSliders />
          </div>
        </ColorPickerContent>
      </ColorPickerPositioner>
    </ColorPicker>
  );
}