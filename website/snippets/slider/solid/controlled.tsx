import { Slider } from '@moduix/solid/slider';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/slider/slider-controlled.module.css';

export default function ControlledSliderDemo() {
  const [value, setValue] = createSignal([24]);

  return (
    <Slider value={value()} onValueChange={(details) => setValue(details.value)}>
      <div class={styles.header}>
        <Slider.Label>Brightness</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider>
  );
}