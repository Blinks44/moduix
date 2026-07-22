import { ColorPicker, parseColor } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function CompactTriggerColorPickerDemo() {
  return (
    <PreviewLayout alignItems="center">
      <ColorPicker defaultValue={parseColor('#eb5e41')}>
        <ColorPicker.Label>Color</ColorPicker.Label>
        <ColorPicker.Control>
          <ColorPicker.Trigger aria-label="Open color picker" data-fit-content>
            <span className="color-picker-trigger-value">
              <span className="color-picker-trigger-value-swatch">
                <ColorPicker.TransparencyGrid />
                <ColorPicker.ValueSwatch />
              </span>
              <ColorPicker.ValueText format="hex" />
            </span>
          </ColorPicker.Trigger>
        </ColorPicker.Control>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
            <ColorPicker.Area />
            <div className="color-picker-slider-group">
              <ColorPicker.EyeDropperTrigger aria-label="Pick color from screen" />
              <ColorPicker.Sliders />
            </div>
          </ColorPicker.Content>
        </ColorPicker.Positioner>
      </ColorPicker>
    </PreviewLayout>
  );
}