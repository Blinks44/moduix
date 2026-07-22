import { Slider } from '@moduix/react';
import { useState } from 'react';

export default function EventsSliderDemo() {
  const [liveValue, setLiveValue] = useState([40]);
  const [committedValue, setCommittedValue] = useState([40]);
  return (
    <div className="slider-stack">
      <Slider
        defaultValue={[40]}
        onValueChange={(details) => setLiveValue(details.value)}
        onValueChangeEnd={(details) => setCommittedValue(details.value)}
      >
        <div className="slider-header">
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
      <div className="slider-status">
        Live {liveValue.join(', ')} / Committed {committedValue.join(', ')}
      </div>
    </div>
  );
}