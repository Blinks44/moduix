import {
  AngleSliderDial,
  AngleSliderLabel,
  AngleSliderMarks,
  AngleSliderRootProvider,
  useAngleSlider,
} from '@moduix/solid/angle-slider';
import { Stack } from '@moduix/solid/stack';

const initialValue = 45;
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export default function RootProviderAngleSliderDemo() {
  const angleSlider = useAngleSlider({
    defaultValue: initialValue,
  });

  return (
    <Stack align="center" gap="3">
      <AngleSliderRootProvider value={angleSlider}>
        <AngleSliderLabel>Rotation</AngleSliderLabel>
        <AngleSliderDial>
          <AngleSliderMarks values={markerValues} />
        </AngleSliderDial>
      </AngleSliderRootProvider>
      <div data-preview-meta>
        <output>Current angle: {angleSlider().value}°</output>
      </div>
    </Stack>
  );
}