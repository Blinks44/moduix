import { Slider, SliderControl, SliderDraggingIndicator, SliderHiddenInput, SliderLabel, SliderRange, SliderThumb, SliderTrack } from '@moduix/react/slider';

export default function DraggingIndicatorSliderDemo() {
  return (
    <Slider defaultValue={[40]}>
      <SliderLabel>Gain</SliderLabel>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0} aria-label="Gain">
          <SliderDraggingIndicator />
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
  );
}