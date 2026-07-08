//#region demo
import { ColorPicker, parseColor } from '@moduix/react';

const _fieldName = 'accent';

export function FormUsageColorPickerDemo() {
  return (
    <form className="color-picker-form">
      <ColorPicker name="accent" defaultValue={parseColor('#eb5e41')}>
        <ColorPicker.Label>Color</ColorPicker.Label>
        <ColorPicker.Control>
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.Trigger aria-label="Open color picker" />
        </ColorPicker.Control>
        <ColorPicker.HiddenInput />
      </ColorPicker>
      <button className="color-picker-submit" type="submit">
        Submit
      </button>
    </form>
  );
}
//#endregion