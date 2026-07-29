import { ProgressCircular, Slider } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function ControlledProgressCircularDemo() {
  const [value, setValue] = useState(42 as number | null);
  return (
    <div className="progress-circular-stack">
      <ProgressCircular value={value} onValueChange={(details) => setValue(details.value)}>
        <ProgressCircular.Label>Upload status</ProgressCircular.Label>
        <div className="progress-circular-circle-container">
          <ProgressCircular.Ring aria-label="Upload status" />
          <ProgressCircular.ValueText />
        </div>
      </ProgressCircular>
      <PreviewMeta>
        <output>Progress: {value ?? 'loading'}%</output>
        <Slider
          className="progress-circular-slider"
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
            <Slider.Thumb index={0} aria-label="Progress value"></Slider.Thumb>
          </Slider.Control>
        </Slider>
      </PreviewMeta>
    </div>
  );
}