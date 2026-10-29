import {
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderRootProvider,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
  useSlider,
} from '@moduix/solid/slider';
import { Stack } from '@moduix/solid/stack';

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
      <output>Current: {slider().value.join(', ')}</output>
      <button type="button" onClick={() => slider().focus()}>
        Focus
      </button>
    </Stack>
  );
}