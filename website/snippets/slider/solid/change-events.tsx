import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@moduix/solid/slider';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/slider/slider-change-events.module.css';

export default function EventsSliderDemo() {
  const [liveValue, setLiveValue] = createSignal([40]);
  const [committedValue, setCommittedValue] = createSignal([40]);

  return (
    <div class={styles.stack}>
      <Slider
        defaultValue={[40]}
        onValueChange={(details) => setLiveValue(details.value)}
        onValueChangeEnd={(details) => setCommittedValue(details.value)}
      >
        <div class={styles.header}>
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
      <output>
        Live: {liveValue().join(', ')} / Committed: {committedValue().join(', ')}
      </output>
    </div>
  );
}