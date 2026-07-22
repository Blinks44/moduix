import { Slider } from '@moduix/react';

export default function RangeSliderDemo() {
  return (
    <Slider defaultValue={[30, 60]}>
      <Slider.Label>Price range</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
      <Slider.ValueText />
    </Slider>
  );
}