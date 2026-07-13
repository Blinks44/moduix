//#region demo
import { ColorPicker, parseColor } from '@moduix/react';

const _defaultColor = '#eb5e41';

export function DisabledColorPickerDemo() {
  return (
    <ColorPicker disabled defaultValue={parseColor('#64748b')}>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.Trigger aria-label="Open color picker" />
      </ColorPicker.Control>
    </ColorPicker>
  );
}
//#endregion