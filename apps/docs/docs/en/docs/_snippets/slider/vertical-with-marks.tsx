import { Slider } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const marks = [0, 25, 50, 75, 100];

export default function VerticalMarksSliderDemo() {
  const [value, setValue] = useState([50]);

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
        <Slider.MarkerGroup>
          {marks.map((mark) => (
            <Slider.Marker key={mark} value={mark}>
              {mark}
            </Slider.Marker>
          ))}
        </Slider.MarkerGroup>
      </Slider>
      <PreviewMeta>
        <output>Output: {value.join(', ')}</output>
      </PreviewMeta>
    </div>
  );
}