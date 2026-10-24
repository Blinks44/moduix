import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@moduix/react/slider';

export default function ThumbOverlapSliderDemo() {
  return (
    <Slider defaultValue={[25, 60]} minStepsBetweenThumbs={5}>
      <SliderLabel>Minimum gap</SliderLabel>
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