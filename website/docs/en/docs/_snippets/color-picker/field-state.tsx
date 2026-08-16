import { ColorPicker, parseColor } from '@moduix/react/color-picker';
import { Field } from '@moduix/react/field';

export default function FieldStateColorPickerDemo() {
  return (
    <Field>
      <ColorPicker name="accent" required invalid defaultValue={parseColor('#eb5e41')}>
        <ColorPicker.Label>Accent color</ColorPicker.Label>
        <ColorPicker.Control>
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.Trigger aria-label="Open color picker" />
        </ColorPicker.Control>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
            <ColorPicker.Area />
          </ColorPicker.Content>
        </ColorPicker.Positioner>
      </ColorPicker>
      <Field.HelperText>Used for generated charts and callouts.</Field.HelperText>
      <Field.ErrorText>Choose an accent color.</Field.ErrorText>
    </Field>
  );
}