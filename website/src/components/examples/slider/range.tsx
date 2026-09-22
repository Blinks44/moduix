import { Slider, SliderControl, SliderLabel, SliderRange, SliderThumbs, SliderTrack, SliderValueText } from '@moduix/react/slider';

export default function RangeSliderDemo() {
  return (
    <Slider defaultValue={[30, 60]}>
      <SliderLabel>Price range</SliderLabel>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
      <SliderValueText />
    </Slider>
  );
}