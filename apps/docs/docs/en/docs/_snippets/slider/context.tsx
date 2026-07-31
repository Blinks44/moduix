import { Slider, useSliderContext } from '@moduix/react/slider';

function SliderStatus() {
  const slider = useSliderContext();

  return (
    <Slider.Label>
      Value: {slider.value.join(', ')} · Dragging: {String(slider.dragging)}
    </Slider.Label>
  );
}

export default function ContextSliderDemo() {
  return (
    <Slider defaultValue={[40]}>
      <SliderStatus />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider>
  );
}