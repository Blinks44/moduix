import { Slider } from '@moduix/react';

export default function ThumbAlignmentSliderDemo() {
  return (
    <Slider defaultValue={[0]} thumbAlignment="center">
      <div className="slider-header">
        <Slider.Label>Centered thumb</Slider.Label>
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