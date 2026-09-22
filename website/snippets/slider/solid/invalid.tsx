import { Slider, SliderControl, SliderLabel, SliderMarker, SliderMarkerGroup, SliderRange, SliderThumbs, SliderTrack, SliderValueText } from '@moduix/solid/slider';
import styles from '@/components/examples/slider/slider-invalid.module.css';

export default function InvalidSliderDemo() {
  return (
    <Slider defaultValue={[32]} invalid>
      <div class={styles.header}>
        <SliderLabel>Volume</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
      <SliderMarkerGroup class={styles.markerGroup}>
        {[0, 50, 100].map((value) => (
          <SliderMarker value={value}>{value}</SliderMarker>
        ))}
      </SliderMarkerGroup>
    </Slider>
  );
}