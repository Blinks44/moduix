import { Slider } from '@moduix/react/slider';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function EventsSliderDemo() {
  const [liveValue, setLiveValue] = useState([40]);
  const [committedValue, setCommittedValue] = useState([40]);
  return (
    <div
      style={{
        display: 'grid',
        justifyItems: 'center',
        gap: 'var(--moduix-spacing-4)',
      }}
    >
      <Slider
        defaultValue={[40]}
        onValueChange={(details) => setLiveValue(details.value)}
        onValueChangeEnd={(details) => setCommittedValue(details.value)}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--moduix-spacing-3)',
          }}
        >
          <Slider.Label>Gain</Slider.Label>
          <Slider.ValueText />
        </div>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider>
      <PreviewMeta>
        <output>
          Live: {liveValue.join(', ')} / Committed: {committedValue.join(', ')}
        </output>
      </PreviewMeta>
    </div>
  );
}