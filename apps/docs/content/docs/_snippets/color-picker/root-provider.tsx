//#region demo
import { useColorPicker } from '@ark-ui/react/color-picker';
import { ColorPicker, parseColor } from '@moduix/react';

const _defaultColor = '#eb5e41';

export function RootProviderColorPickerDemo() {
  const colorPicker = useColorPicker({ defaultValue: parseColor('#9333ea') });

  return (
    <ColorPicker.RootProvider value={colorPicker}>
      <div className="color-picker-value-row">
        <ColorPicker.Label>Provider color</ColorPicker.Label>
        <ColorPicker.ValueText format="hex" />
      </div>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.Trigger aria-label="Open color picker" />
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area>
            <ColorPicker.AreaBackground />
            <ColorPicker.AreaThumb />
          </ColorPicker.Area>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
      <ColorPicker.HiddenInput />
    </ColorPicker.RootProvider>
  );
}
//#endregion