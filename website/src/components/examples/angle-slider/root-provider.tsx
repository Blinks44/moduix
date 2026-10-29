import {
  AngleSliderDial,
  AngleSliderLabel,
  AngleSliderMarks,
  AngleSliderRootProvider,
  useAngleSlider,
} from '@moduix/react/angle-slider';
import { Stack } from '@moduix/react/stack';
import { PreviewMeta } from '@/components/mdx/Components';

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
      <PreviewMeta>
        <output>Current angle: {angleSlider.value}°</output>
      </PreviewMeta>
    </Stack>
  );
}