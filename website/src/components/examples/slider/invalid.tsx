import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@moduix/react/slider';

export default function InvalidSliderDemo() {
  return (
    <Slider defaultValue={[32]} invalid>
      <SliderLabel>Volume</SliderLabel>
      <SliderValueText />
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
      <SliderMarkerGroup>
        {[0, 50, 100].map((value) => (
          <SliderMarker key={value} value={value}>
            {value}
          </SliderMarker>
        ))}
      </SliderMarkerGroup>
    </Slider>
  );
}