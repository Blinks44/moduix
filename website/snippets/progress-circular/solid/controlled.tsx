import {
  ProgressCircular,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularValueText,
} from '@moduix/solid/progress-circular';
import { Slider, SliderControl, SliderHiddenInput, SliderLabel, SliderRange, SliderThumb, SliderTrack, SliderValueText } from '@moduix/solid/slider';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/progress-circular/component-controlled.module.css';

export default function ControlledProgressCircularDemo() {
  const [value, setValue] = createSignal<number | null>(42);

  return (
    <div class={styles.stack}>
      <ProgressCircular value={value()} onValueChange={(details) => setValue(details.value)}>
        <ProgressCircularLabel>Upload status</ProgressCircularLabel>
        <div class={styles.circleContainer}>
          <ProgressCircularRing aria-label="Upload status" />
          <ProgressCircularValueText />
        </div>
      </ProgressCircular>
      <div>
        <output>Progress: {value() ?? 'loading'}%</output>
        <Slider
          class={styles.slider}
          min={0}
          max={100}
          value={[value() ?? 0]}
          onValueChange={(details) => setValue(details.value[0] ?? 0)}
        >
          <SliderLabel>Progress value</SliderLabel>
          <SliderValueText />
          <SliderControl>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb index={0} aria-label="Progress value">
              <SliderHiddenInput />
            </SliderThumb>
          </SliderControl>
        </Slider>
      </div>
    </div>
  );
}
