import { Slider, SliderControl, SliderLabel, SliderMarker, SliderMarkerGroup, SliderRange, SliderThumbs, SliderTrack, SliderValueText } from '@moduix/react/slider';
import styles from '@/components/examples/slider/slider-marks.module.css';

const marks = [0, 25, 50, 75, 100];

export default function MarksSliderDemo() {
  return (
    <Slider defaultValue={[50]}>
      <div className={styles.header}>
        <SliderLabel>Progress</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
      <SliderMarkerGroup className={styles.markerGroup}>
        {marks.map((value) => (
          <SliderMarker key={value} value={value}>
            {value}
          </SliderMarker>
        ))}
      </SliderMarkerGroup>
    </Slider>
  );
}