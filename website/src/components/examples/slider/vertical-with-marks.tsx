import {
  Slider,
  SliderControl,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderThumbs,
  SliderTrack,
} from '@moduix/react/slider';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';

const marks = [0, 25, 50, 75, 100];

export default function VerticalMarksSliderDemo() {
  const [value, setValue] = useState([50]);

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
        <SliderMarkerGroup>
          {marks.map((mark) => (
            <SliderMarker key={mark} value={mark}>
              {mark}
            </SliderMarker>
          ))}
        </SliderMarkerGroup>
      </Slider>
      <div data-preview-meta>
        <output>Output: {value.join(', ')}</output>
      </div>
    </Stack>
  );
}