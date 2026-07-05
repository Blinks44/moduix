//#region demo
import { ColorPicker, parseColor } from '@moduix/react';

const _defaultColor = '#eb5e41';

export function ValueSwatchColorPickerDemo() {
  return (
    <ColorPicker defaultValue={parseColor('#dc2626')}>
      <ColorPicker.Label>Current color</ColorPicker.Label>
      <div className="color-picker-value-swatch">
        <ColorPicker.TransparencyGrid />
        <ColorPicker.ValueSwatch />
      </div>
      <ColorPicker.ValueText format="hex" />
    </ColorPicker>
  );
}
//#endregion