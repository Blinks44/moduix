import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@moduix/react/slider';
import styles from '@/components/examples/slider/slider-read-only.module.css';

export default function ReadOnlySliderDemo() {
  return (
    <Slider defaultValue={[32]} readOnly>
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
    </Slider>
  );
}