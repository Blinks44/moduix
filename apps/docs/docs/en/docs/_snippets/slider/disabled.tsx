import { Slider } from '@moduix/react';

export default function DisabledSliderDemo() {
  return (
    <Slider defaultValue={[32]} disabled>
      <div className="slider-header">
        <Slider.Label>Notifications</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider>
  );
}