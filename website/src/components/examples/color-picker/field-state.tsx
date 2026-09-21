import {
  ColorPicker,
  parseColor,
  ColorPickerHiddenInput,
  ColorPickerLabel,
  ColorPickerControl,
  ColorPickerTrigger,
  ColorPickerPositioner,
  ColorPickerContent,
  ColorPickerArea,
  ColorPickerChannelInput,
} from '@moduix/react/color-picker';
import { Field } from '@moduix/react/field';
import styles from '@/components/examples/color-picker/color-picker-field-state.module.css';

export default function FieldStateColorPickerDemo() {
  return (
    <Field className={styles.root}>
      <ColorPicker name="accent" required invalid defaultValue={parseColor('#eb5e41')}>
        <ColorPickerLabel>Accent color</ColorPickerLabel>
        <ColorPickerControl>
          <ColorPickerChannelInput channel="hex" />
          <ColorPickerTrigger aria-label="Open color picker" />
        </ColorPickerControl>
        <ColorPickerPositioner>
          <ColorPickerContent>
            <ColorPickerArea />
          </ColorPickerContent>
        </ColorPickerPositioner>
        <ColorPickerHiddenInput />
      </ColorPicker>
      <Field.HelperText>Used for generated charts and callouts.</Field.HelperText>
      <Field.ErrorText>Choose an accent color.</Field.ErrorText>
    </Field>
  );
}