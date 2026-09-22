import {
  ProgressCircular,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularValueText,
} from '@moduix/react/progress-circular';
import { Slider } from '@moduix/react/slider';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/progress-circular/component-controlled.module.css';

export default function ControlledProgressCircularDemo() {
  const [value, setValue] = useState(42 as number | null);
  return (
    <div className={styles.stack}>
      <ProgressCircular value={value} onValueChange={(details) => setValue(details.value)}>
        <ProgressCircularLabel>Upload status</ProgressCircularLabel>
        <div className={styles.circleContainer}>
          <ProgressCircularRing aria-label="Upload status" />
          <ProgressCircularValueText />
        </div>
      </ProgressCircular>
      <PreviewMeta>
        <output>Progress: {value ?? 'loading'}%</output>
        <Slider
          className={styles.slider}
          min={0}
          max={100}
          value={[value ?? 0]}
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
      </PreviewMeta>
    </div>
  );
}
