//#region demo
import { ColorPicker, parseColor } from '@moduix/react';
import { useState } from 'react';

const _initialOpen = false;
const _defaultColor = '#14b8a6';

export function OpenControlledColorPickerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <ColorPicker
      defaultValue={parseColor('#14b8a6')}
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <ColorPicker.Label>Open controlled</ColorPicker.Label>
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
      <button type="button" onClick={() => setOpen((current) => !current)}>
        {open ? 'Close' : 'Open'}
      </button>
    </ColorPicker>
  );
}
//#endregion