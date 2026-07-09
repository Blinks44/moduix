//#region demo
import { ColorPicker, parseColor } from '@moduix/react';

const _defaultColor = '#eb5e41';

export function SliderOnlyColorPickerDemo() {
  return (
    <ColorPicker inline defaultValue={parseColor('#2563eb')}>
      <ColorPicker.Label>Channels</ColorPicker.Label>
      <ColorPicker.Area />
      <ColorPicker.Sliders />
    </ColorPicker>
  );
}
//#endregion