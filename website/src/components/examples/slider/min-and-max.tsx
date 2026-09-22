import { Slider, SliderControl, SliderLabel, SliderRange, SliderThumbs, SliderTrack, SliderValueText } from '@moduix/react/slider';

export default function MinMaxSliderDemo() {
  return (
    <Slider min={-10} max={10} defaultValue={[0]}>
      <SliderLabel>Offset</SliderLabel>
      <SliderValueText />
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
    </Slider>
  );
}