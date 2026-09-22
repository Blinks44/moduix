import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@moduix/react/slider';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/slider/slider-change-events.module.css';

export default function EventsSliderDemo() {
  const [liveValue, setLiveValue] = useState([40]);
  const [committedValue, setCommittedValue] = useState([40]);
  return (
    <div className={styles.stack}>
      <Slider
        defaultValue={[40]}
        onValueChange={(details) => setLiveValue(details.value)}
        onValueChangeEnd={(details) => setCommittedValue(details.value)}
      >
        <div className={styles.header}>
          <SliderLabel>Gain</SliderLabel>
          <SliderValueText />
        </div>
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
    </div>
  );
}