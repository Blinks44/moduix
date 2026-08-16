import { Slider } from '@moduix/react/slider';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function VerticalSliderDemo() {
  const [value, setValue] = useState([60]);

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--moduix-spacing-3)' }}>
      <Slider
        aria-label={['Output']}
        orientation="vertical"
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider>
      <PreviewMeta>
        <output>Output: {value.join(', ')}</output>
      </PreviewMeta>
    </div>
  );
}