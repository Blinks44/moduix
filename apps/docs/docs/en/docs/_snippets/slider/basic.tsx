import { Slider } from '@moduix/react';

export default function SliderDemo() {
  return (
    <Slider defaultValue={[40]}>
      <div className="slider-header">
        <Slider.Label>Volume</Slider.Label>
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