import { Slider, SliderControl, SliderLabel, SliderRange, SliderThumbs, SliderTrack, useSliderContext } from '@moduix/react/slider';

function SliderStatus() {
  const slider = useSliderContext();

  return (
    <SliderLabel>
      Value: {slider.value.join(', ')} · Dragging: {String(slider.dragging)}
    </SliderLabel>
  );
}

export default function ContextSliderDemo() {
  return (
    <Slider defaultValue={[40]}>
      <SliderStatus />
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
    </Slider>
  );
}