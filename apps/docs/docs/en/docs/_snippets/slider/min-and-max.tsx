import { Slider } from '@moduix/react';

export default function MinMaxSliderDemo() {
  return (
    <Slider min={-10} max={10} defaultValue={[0]}>
      <Slider.Label>Offset</Slider.Label>
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