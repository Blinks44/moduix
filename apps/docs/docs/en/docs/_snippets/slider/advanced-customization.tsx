import { Slider } from '@moduix/react';

export default function AdvancedCustomizationSliderDemo() {
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
        <Slider.Thumb index={0} aria-label="Volume"></Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}