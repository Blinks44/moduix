import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@moduix/react/slider';
import styles from '@/components/examples/slider/slider-thumb-alignment.module.css';

export default function ThumbAlignmentSliderDemo() {
  return (
    <Slider defaultValue={[0]} thumbAlignment="center">
      <div className={styles.header}>
        <SliderLabel>Centered thumb</SliderLabel>
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