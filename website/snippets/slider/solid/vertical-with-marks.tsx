import { Slider, SliderControl, SliderMarker, SliderMarkerGroup, SliderRange, SliderThumbs, SliderTrack } from '@moduix/solid/slider';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/slider/slider-vertical-with-marks.module.css';

const marks = [0, 25, 50, 75, 100];

export default function VerticalMarksSliderDemo() {
  const [value, setValue] = createSignal([50]);

  return (
    <div class={styles.stack}>
      <Slider
        aria-label={['Output']}
        orientation="vertical"
        value={value()}
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
            <SliderMarker value={mark}>{mark}</SliderMarker>
          ))}
        </SliderMarkerGroup>
      </Slider>
      <output>Output: {value().join(', ')}</output>
    </div>
  );
}