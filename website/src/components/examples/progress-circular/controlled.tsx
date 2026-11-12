import {
  ProgressCircular,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularValueText,
} from '@moduix/react/progress-circular';
import {
  Slider,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderThumb,
  SliderTrack,
  SliderValueText,
} from '@moduix/react/slider';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';
import styles from '@/components/examples/progress-circular/component-controlled.module.css';

export default function ControlledProgressCircularDemo() {
  const [value, setValue] = useState(42 as number | null);
  return (
    <Stack align="center" gap="4">
      <ProgressCircular value={value} onValueChange={(details) => setValue(details.value)}>
        <ProgressCircularLabel>Upload status</ProgressCircularLabel>
        <div className={styles.circleContainer}>
          <ProgressCircularRing aria-label="Upload status" />
          <ProgressCircularValueText />
        </div>
      </ProgressCircular>
      <div data-preview-meta>
        <output>Progress: {value ?? 'loading'}%</output>
        <Slider
          className={styles.slider}
          min={0}
          max={100}
          value={[value ?? 0]}
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
    </Stack>
  );
}