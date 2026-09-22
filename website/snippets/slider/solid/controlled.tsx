import { Slider, SliderControl, SliderLabel, SliderRange, SliderThumbs, SliderTrack, SliderValueText } from '@moduix/solid/slider';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/slider/slider-controlled.module.css';

export default function ControlledSliderDemo() {
  const [value, setValue] = createSignal([24]);

  return (
    <Slider value={value()} onValueChange={(details) => setValue(details.value)}>
      <div class={styles.header}>
        <SliderLabel>Brightness</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
    </Slider>
  );
}