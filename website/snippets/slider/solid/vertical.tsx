import { Slider } from '@moduix/solid/slider';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/slider/slider-vertical.module.css';

export default function VerticalSliderDemo() {
  const [value, setValue] = createSignal([60]);

  return (
    <div class={styles.stack}>
      <Slider
        aria-label={['Output']}
        orientation="vertical"
        value={value()}
        onValueChange={(details) => setValue(details.value)}
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider>
      <output>Output: {value().join(', ')}</output>
    </div>
  );
}