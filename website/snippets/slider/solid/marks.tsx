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
} from '@moduix/solid/slider';
import styles from '@/components/examples/slider/slider-marks.module.css';

const marks = [0, 25, 50, 75, 100];

export default function MarksSliderDemo() {
  return (
    <Slider defaultValue={[50]}>
      <div class={styles.header}>
        <SliderLabel>Progress</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
      <SliderMarkerGroup class={styles.markerGroup}>
        {marks.map((value) => (
          <SliderMarker value={value}>{value}</SliderMarker>
        ))}
      </SliderMarkerGroup>
    </Slider>
  );
}