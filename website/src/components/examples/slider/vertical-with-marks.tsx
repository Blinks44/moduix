import {
  Slider,
  SliderControl,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderThumbs,
  SliderTrack,
} from '@moduix/react/slider';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/slider/slider-vertical-with-marks.module.css';

const marks = [0, 25, 50, 75, 100];

export default function VerticalMarksSliderDemo() {
  const [value, setValue] = useState([50]);

  return (
    <div className={styles.stack}>
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
      <PreviewMeta>
        <output>Output: {value.join(', ')}</output>
      </PreviewMeta>
    </div>
  );
}