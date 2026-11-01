import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@moduix/react/slider';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function EventsSliderDemo() {
  const [liveValue, setLiveValue] = useState([40]);
  const [committedValue, setCommittedValue] = useState([40]);
  return (
    <Stack align="center" gap="4">
      <Slider
        defaultValue={[40]}
        onValueChange={(details) => setLiveValue(details.value)}
        onValueChangeEnd={(details) => setCommittedValue(details.value)}
      >
        <SliderLabel>Gain</SliderLabel>
        <SliderValueText />
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumbs />
        </SliderControl>
      </Slider>
      <PreviewMeta>
        <output>
          Live: {liveValue.join(', ')} / Committed: {committedValue.join(', ')}
        </output>
      </PreviewMeta>
    </Stack>
  );
}