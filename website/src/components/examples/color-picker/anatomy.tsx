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
  ColorPickerEyeDropperTrigger,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerSliders,
} from '@moduix/react/color-picker';
import { Stack } from '@moduix/react/stack';

const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];

// Anatomy scene: the basic example kept open and inline so every part can be outlined.
export default function ColorPickerAnatomy() {
  return (
    <div
      style={{
        minHeight: 460,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <ColorPicker open portalled={false} defaultValue={parseColor('#eb5e41')}>
        <ColorPickerLabel>Color</ColorPickerLabel>
        <ColorPickerControl>
          <ColorPickerChannelInput channel="hex" />
          <ColorPickerChannelInput channel="alpha" />
          <ColorPickerTrigger aria-label="Open color picker" />
        </ColorPickerControl>
        <ColorPickerPositioner>
          <ColorPickerContent>
            <ColorPickerArea />
            <Stack direction="row" align="center" gap="3">
              <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" />
              <ColorPickerSliders />
            </Stack>
            <ColorPickerSwatchGroup>
              {swatches.map((color) => (
                <ColorPickerSwatchTrigger key={color} value={color} />
              ))}
            </ColorPickerSwatchGroup>
          </ColorPickerContent>
        </ColorPickerPositioner>
        <ColorPickerHiddenInput />
      </ColorPicker>
    </div>
  );
}