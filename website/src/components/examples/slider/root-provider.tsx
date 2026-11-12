import { Button } from '@moduix/react/button';
import {
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderRootProvider,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
  useSlider,
} from '@moduix/react/slider';
import { Stack } from '@moduix/react/stack';

export default function RootProviderSliderDemo() {
  const slider = useSlider({
    defaultValue: [40],
  });
  return (
    <Stack align="center" gap="4">
      <SliderRootProvider value={slider}>
        <SliderLabel>Volume</SliderLabel>
        <SliderValueText />
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumbs />
        </SliderControl>
      </SliderRootProvider>
      <div data-preview-meta>
        <output>Current: {slider.value.join(', ')}</output>
        <Button onClick={() => slider.focus()} size="sm">
          Focus
        </Button>
      </div>
    </Stack>
  );
}