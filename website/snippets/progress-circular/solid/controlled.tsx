import {
  ProgressCircular,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularValueText,
} from '@moduix/solid/progress-circular';
import { Slider } from '@moduix/solid/slider';
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
          <Slider.Label>Progress value</Slider.Label>
          <Slider.ValueText />
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0} aria-label="Progress value">
              <Slider.HiddenInput />
            </Slider.Thumb>
          </Slider.Control>
        </Slider>
      </div>
    </div>
  );
}
