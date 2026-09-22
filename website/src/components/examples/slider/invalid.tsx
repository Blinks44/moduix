import { Slider, SliderControl, SliderLabel, SliderMarker, SliderMarkerGroup, SliderRange, SliderThumbs, SliderTrack, SliderValueText } from '@moduix/react/slider';
import styles from '@/components/examples/slider/slider-invalid.module.css';

export default function InvalidSliderDemo() {
  return (
    <Slider defaultValue={[32]} invalid>
      <div className={styles.header}>
        <SliderLabel>Volume</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
      <SliderMarkerGroup className={styles.markerGroup}>
        {[0, 50, 100].map((value) => (
          <SliderMarker key={value} value={value}>
            {value}
          </SliderMarker>
        ))}
      </SliderMarkerGroup>
    </Slider>
  );
}