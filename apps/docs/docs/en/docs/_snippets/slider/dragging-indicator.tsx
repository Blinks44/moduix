import { Slider } from '@moduix/react';

export default function DraggingIndicatorSliderDemo() {
  return (
    <Slider defaultValue={[40]}>
      <Slider.Label>Gain</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Gain">
          <Slider.DraggingIndicator />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}