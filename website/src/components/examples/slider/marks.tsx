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

const marks = [0, 25, 50, 75, 100];

export default function MarksSliderDemo() {
  return (
    <Slider defaultValue={[50]}>
      <SliderLabel>Progress</SliderLabel>
      <SliderValueText />
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
      <SliderMarkerGroup>
        {marks.map((value) => (
          <SliderMarker key={value} value={value}>
            {value}
          </SliderMarker>
        ))}
      </SliderMarkerGroup>
    </Slider>
  );
}