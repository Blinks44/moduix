import { Slider } from '@moduix/solid/slider';
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
          <Slider.Label>Gain</Slider.Label>
          <Slider.ValueText />
        </div>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider>
      <output>
        Live: {liveValue().join(', ')} / Committed: {committedValue().join(', ')}
      </output>
    </div>
  );
}