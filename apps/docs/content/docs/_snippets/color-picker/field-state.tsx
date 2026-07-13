//#region demo
import { ColorPicker, Field, parseColor } from '@moduix/react';

const _fieldState = {
  required: true,
  invalid: true,
  name: 'accent',
};

export function FieldStateColorPickerDemo() {
  return (
    <Field className="color-picker-field">
      <ColorPicker name="accent" required invalid defaultValue={parseColor('#eb5e41')}>
        <ColorPicker.Label>Accent color</ColorPicker.Label>
        <ColorPicker.Control>
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.Trigger aria-label="Open color picker" />
        </ColorPicker.Control>
      </ColorPicker>
      <Field.HelperText>Used for generated charts and callouts.</Field.HelperText>
      <Field.ErrorText>Choose an accent color.</Field.ErrorText>
    </Field>
  );
}
//#endregion