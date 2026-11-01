import {
  Slider,
  SliderControl,
  SliderRange,
  SliderThumbs,
  SliderTrack,
} from '@moduix/react/slider';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function VerticalSliderDemo() {
  const [value, setValue] = useState([60]);

  return (
    <Stack align="center" gap="3">
      <Slider
        aria-label={['Output']}
        orientation="vertical"
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumbs />
        </SliderControl>
      </Slider>
      <PreviewMeta>
        <output>Output: {value.join(', ')}</output>
      </PreviewMeta>
    </Stack>
  );
}