import { Slider } from '@moduix/react';

export default function VerticalSliderDemo() {
  return (
    <Slider orientation="vertical" defaultValue={[60]} className="slider-vertical">
      <Slider.Label>Output</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider>
  );
}